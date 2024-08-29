const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const multer = require("multer");
const mime = require("mime-types");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cron = require("node-cron");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, true);
  },
});
const app = express();
const port = 3000;
const secretKey =
  "409760be8ad4de38ec084202a4ac97116d29df8e28f40c31768a0a0ef95c1ea0";
app.use(bodyParser.json());
app.use(cors());

// const deleteOldProjects = () => {
//   const deleteQuery =
//     "DELETE FROM trash WHERE deleted_at < NOW() - INTERVAL 1 MINUTE";
//   db.query(deleteQuery, (err, results) => {
//     if (err) {
//       console.error("Error deleting old projects from trash:", err);
//     } else {
//       console.log("Old projects deleted from trash:", results.affectedRows);
//     }
//   });
// };

// // Thiết lập cron job để chạy mỗi giờ
// cron.schedule("* * * * *", () => {
//   console.log("Running cron job to delete old projects from trash");
//   deleteOldProjects();
// });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mydb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Middleware để xác nhận kết nối MySQL trước khi xử lý yêu cầu
const ensureDbConnection = (req, res, next) => {
  if (!db || !db.config.connectTimeout) {
    return res
      .status(500)
      .json({ error: "Database connection is not established" });
  }
  next();
};

// Endpoint đăng nhập
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    const userId = user.id;
    const email = user.email;
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, userId, email });
  });
});
// Endpoint đăng ký
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
});

// Endpoint để đổi mật khẩu
app.put("/change-password", ensureDbConnection, (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  // Truy vấn để lấy mật khẩu hiện tại từ DB
  const query = "SELECT password FROM users WHERE id = ?";
  db.query(query, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const storedPassword = results[0].password;

    // Kiểm tra mật khẩu hiện tại
    if (currentPassword !== storedPassword) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Kiểm tra nếu mật khẩu mới giống với mật khẩu hiện tại
    if (currentPassword === newPassword) {
      return res.status(400).json({
        error: "New password cannot be the same as the current password",
      });
    }

    // Cập nhật mật khẩu mới trong DB
    const updateQuery = "UPDATE users SET password = ? WHERE id = ?";
    db.query(updateQuery, [newPassword, userId], (err) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Password changed successfully" });
    });
  });
});

// Endpoint để lấy danh sách projects
app.get("/main/projects/:userId", ensureDbConnection, (req, res) => {
  const { userId } = req.params;
  const sql = `
        SELECT p.id, p.name, p.created_at, p.start_date, p.end_date
        FROM projects p
        INNER JOIN users u ON p.user_id = u.id
        WHERE u.id = ?
      `;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
});

// Tạo endpoint để tạo project mới
app.post("/add-project", ensureDbConnection, (req, res) => {
  const { name } = req.body;
  const userId = req.headers.user_id;

  // Truy vấn để lấy ID cao nhất hiện có
  const getMaxIdQuery = "SELECT MAX(id) AS maxId FROM projects";
  db.query(getMaxIdQuery, (err, results) => {
    if (err) {
      console.error("Error fetching maxId:", err);
      return res.status(500).json({ error: err });
    }

    const maxId = results[0].maxId;
    const newId = maxId + 1;

    // Tạo giá trị thời gian hiện tại
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 19).replace("T", " "); // Định dạng thời gian phù hợp với MySQL

    // Thêm item mới với ID mới và các giá trị thời gian
    const addItemQuery =
      "INSERT INTO projects (id, name, user_id, created_at, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      addItemQuery,
      [newId, name, userId, formattedNow, formattedNow, formattedNow],
      (err, result) => {
        if (err) {
          console.error("Error inserting new project:", err);
          return res.status(500).json({ error: err });
        }
        res.status(201).json({
          message: "Project added successfully",
          id: newId,
          user_id: userId,
          created_at: now,
          start_date: now,
          end_date: now,
        });
      }
    );
  });
});

// Endpoint để xóa project
app.put("/delete-project/:id/:userId", ensureDbConnection, (req, res) => {
  const { id } = req.params;

  // const deleteItemsQuery = "DELETE FROM todolist WHERE project_id = ?";
  // db.query(deleteItemsQuery, [id], (err) => {
  //   if (err) {
  //     return res
  //       .status(500)
  //       .json({ error: "Error deleting items from todolist" });
  //   }
  const updateProjectQuery = "UPDATE projects SET user_id=null WHERE id = ?";
  db.query(updateProjectQuery, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    // Thực hiện truy vấn SQL để lấy project từ bảng projects có user_id = null
    const selectProjectsQuery =
      "SELECT id, name FROM projects WHERE user_id IS NULL";
    db.query(selectProjectsQuery, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      // Thêm project_id và name của các project có user_id là null vào bảng trash
      const insertTrashQuery =
        "INSERT INTO trash (project_id, name, deleted_at, user_id) VALUES ?";
      const values = results.map((project) => [
        project.id,
        project.name,
        new Date(),
        req.params.userId,
      ]);

      db.query(insertTrashQuery, [values], (err) => {
        if (err) {
          return res.status(500).json({ error: "Error inserting into trash" });
        }
        res.status(200).json({
          message: "Project deleted and moved to trash successfully",
        });
      });
    });
  });
});

//Endpoint để lấy danh sách file được add trong project
app.get("/files/:userId/:projectId", (req, res) => {
  const { userId, projectId } = req.params;
  const query = "SELECT*FROM files WHERE project_id = ? AND user_id = ?";
  db.query(query, [projectId, userId], (err, result) => {
    if (err) {
      console.error("Error fetching files from database:", err);
      res.status(500).send("Error fetching files");
      return;
    }
    res.json(result);
  });
});

// Endpoint để add file vào project
app.put("/add-files/:id/:projectId", ensureDbConnection, (req, res) => {
  const { id, projectId } = req.params;

  const query = "UPDATE files SET project_id = ? WHERE id = ?";
  db.query(query, [projectId, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: "File added successfully" });
  });
});

// Endpoint để xóa file khỏi project
app.put("/remove-file/:id", ensureDbConnection, (req, res) => {
  const { id } = req.params.id;
  const query = "UPDATE files SET project_id = NULL WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: "File removed successfully" });
  });
});

//Endpoint để lấy thông tin project
app.get("/projects/:projectId", ensureDbConnection, (req, res) => {
  const { projectId } = req.params;
  const sql = "SELECT name FROM projects WHERE id = ?";
  db.query(sql, [projectId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(results[0]);
  });
});

// Enpoint để lấy số lượng công việc của mỗi project
app.get("/projects/:projectId/tasks", ensureDbConnection, (req, res) => {
  const { projectId } = req.params;
  //select count theo status của task, có bao nhiêu task status là to do, in progress, done
  const sql = `
        SELECT COUNT(*) AS count, status
        FROM todolist
        WHERE project_id = ?
        GROUP BY status
      `;
  db.query(sql, [projectId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
});

// Endpoint để cập nhật thông tin dự án
app.put("/update-project/:id", ensureDbConnection, (req, res) => {
  const { id } = req.params;
  const { start_date, end_date } = req.body;

  const query = `
      UPDATE projects
      SET start_date = ?, end_date = ?
      WHERE id = ?
    `;

  db.query(query, [start_date, end_date, id], (err, results) => {
    if (err) {
      console.error("Error updating project:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project updated successfully" });
  });
});

// Endpoint to get marked project
app.get("/markedProject/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = "SELECT * FROM marked_projects WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
});

// Endpoint to mark a project
app.post("/mark-project/:userId", (req, res) => {
  const { id, name } = req.body;
  const { userId } = req.params;
  // Lấy created_at từ bảng projects
  const query = "SELECT created_at FROM projects WHERE id = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    const { created_at } = results[0];

    // Insert project vào bảng marked_projects
    const insertQuery =
      "INSERT INTO marked_projects (id, name, created_at, user_id) VALUES (?, ?, ?, ?)";
    db.query(insertQuery, [id, name, created_at, userId], (err) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Project marked successfully" });
    });
  });
});

// Endpoint to unmark a project
app.delete("/unmark-project", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Project ID is required" });
  }

  try {
    // Assuming you have a table `marked_projects` and you want to remove the entry
    db.query("DELETE FROM marked_projects WHERE id = ?", [id]);
    res.status(200).json({ message: "Project unmarked successfully" });
  } catch (error) {
    console.error("Error unmarking project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint để lấy data users cho việc sign
app.get("/users/:id", ensureDbConnection, (req, res) => {
  const { id } = req.params;
  const query = "SELECT email, profile_picture FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // Chuyển đổi profile_picture từ LONGBLOB thành base64
    const user = results[0];
    const userWithBase64Image = {
      email: user.email,
      profilePicture: user.profile_picture
        ? `data:image/png;base64,${user.profile_picture.toString("base64")}`
        : null,
    };
    res.status(200).json(userWithBase64Image);
  });
});
//Endpoint để lấy danh sách signed
app.get("/signed/:projectId", ensureDbConnection, (req, res) => {
  const { projectId } = req.params;
  const query = "SELECT id, team FROM signed WHERE project_id = ?";
  db.query(query, [projectId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
});

//Endpoint để thêm signed
app.post("/sign-project/:projectId", ensureDbConnection, (req, res) => {
  const { projectId } = req.params;
  const { team } = req.body;

  // Thêm bản ghi vào bảng signed
  const insertSignedQuery =
    "INSERT INTO signed (team, project_id) VALUES (?, ?)";
  db.query(insertSignedQuery, [team, projectId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res
      .status(201)
      .json({ message: "Signed added and project updated successfully" });
  });
});

//Endpoint để lấy danh sách signed của user cụ thể
app.get("/signed-projects/:team", ensureDbConnection, (req, res) => {
  const { team } = req.params;

  const query = `
        SELECT projects.*
        FROM projects
        JOIN signed ON projects.id = signed.project_id
        WHERE signed.team = ?
      `;

  db.query(query, [team], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
});

//Endpoint để xóa signed
app.delete("/delete-signed/:id/:projectId", ensureDbConnection, (req, res) => {
  const { id, projectId } = req.params;
  const query = "DELETE FROM signed WHERE id = ? AND project_id = ?";
  db.query(query, [id, projectId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: "Signed deleted successfully" });
  });
});

// Endpoint lấy danh sách công việc (todos) dựa trên project_id
app.get("/todo/:projectId", ensureDbConnection, (req, res) => {
  const { projectId } = req.params;

  const query = `SELECT t.id, t.name, t.status, t.order_index FROM todolist t INNER JOIN projects p ON t.project_id = p.id WHERE p.id = ?`;

  db.query(query, [projectId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // Phân loại các công việc theo status
    const todoItems = results.filter((item) => item.status === "to do");
    const doneItems = results.filter((item) => item.status === "done");
    const inprogressItems = results.filter(
      (item) => item.status === "in progress"
    );

    // Trả về dữ liệu ở dạng object chứa ba mảng
    res
      .status(200)
      .json({ todo: todoItems, done: doneItems, inprogress: inprogressItems });
  });
});

// Endpoint thêm task mới
app.post("/add-task", ensureDbConnection, (req, res) => {
  const { name, status } = req.body;
  const projectId = req.body.project_id;
  console.log("projectId", projectId);
  // Truy vấn để lấy ID cao nhất hiện có
  const getMaxIdQuery = "SELECT MAX(id) AS maxId FROM todolist";
  db.query(getMaxIdQuery, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    const maxId = results[0].maxId;
    const newId = maxId + 1;

    // Thêm item mới với ID mới
    const addItemQuery =
      "INSERT INTO todolist (id, name, status, project_id) VALUES (?, ?, ?, ?)";
    db.query(addItemQuery, [newId, name, status, projectId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({
        message: "Item added successfully",
        id: newId,
        project_id: projectId,
      });
    });
  });
});

// Endpoint xóa task
app.delete("/delete-task/:id", ensureDbConnection, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM todolist WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  });
});

// Endpoint cập nhật status và order của item sau khi drop từ todo sang done
app.put("/update-task", ensureDbConnection, (req, res) => {
  const { id, status, order_index } = req.body;

  const query = "UPDATE todolist SET status = ?, order_index = ? WHERE id = ?";
  db.query(query, [status, order_index, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: "Item updated successfully" });
  });
});

// Endpoint để lấy deleted projects
app.get("/trash/:userId", ensureDbConnection, (req, res) => {
  const { userId } = req.params;
  const query = "SELECT * FROM trash WHERE status = 'deleted' AND user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
});

// Endpoint để khôi phục project
app.put("/restore-project/:id/:userId", ensureDbConnection, (req, res) => {
  const { userId, id } = req.params;

  const updateTrashQuery = "UPDATE trash SET status = 'active' WHERE id = ?";
  db.query(updateTrashQuery, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    const getProjectIdQuery =
      "SELECT project_id FROM trash WHERE id = ? AND status = 'active'";
    db.query(getProjectIdQuery, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ error: "Project not found or not active" });
      }
      const projectId = results[0].project_id;
      const updateProjectQuery = "UPDATE projects SET user_id = ? WHERE id = ?";
      db.query(updateProjectQuery, [userId, projectId], (err) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: "Project restored successfully" });
      });
    });
  });
});

//Endpoint get id when email
app.get("/get-id/:email", ensureDbConnection, (req, res) => {
  const { email } = req.params;
  const query = "SELECT id FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results[0]);
  });
});

// Endpoint để thêm user vào teammates
app.post("/add-teammate/:userId/:partnerId", ensureDbConnection, (req, res) => {
  const { userId, partnerId } = req.params;

  const query =
    "INSERT INTO teammates (user_id, partner_id, status) VALUES (?, ?, 'accepted'), (?, ?, 'accepted')";

  // Thực hiện truy vấn
  db.query(query, [userId, partnerId, partnerId, userId], (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm user vào teammates:", err);
      return res.status(500).json({ error: "Đã xảy ra lỗi khi thêm teammate" });
    }
    res.status(201).json({ message: "Teammate added successfully" });
  });
});

//Endpoint để lấy danh sách tên và ảnh team_members trong 1 team
app.get("/team-members/:teamId", ensureDbConnection, (req, res) => {
  const { teamId } = req.params;
  const query = `
        SELECT u.id, u.email, u.profile_picture
        FROM users u
        JOIN team_members tm ON u.id = tm.user_id
        WHERE tm.team_id = ?
      `;
  db.query(query, [teamId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // Chuyển đổi profile_picture từ LONGBLOB thành base64
    const usersWithBase64Images = results.map((user) => {
      return {
        id: user.id,
        email: user.email,
        profilePicture: user.profile_picture
          ? `data:image/png;base64,${user.profile_picture.toString("base64")}`
          : null,
      };
    });

    res.status(200).json(usersWithBase64Images);
  });
});

// Endpoint để lấy ảnh và email của user
app.get("/teammates/:userId", ensureDbConnection, (req, res) => {
  const { userId } = req.params;

  // Query để lấy thông tin của chính user và các teammates
  const query = `
    SELECT DISTINCT  u.id, u.email, u.profile_picture
    FROM users u
    LEFT JOIN teammates t ON u.id = t.partner_id
    WHERE t.user_id = ? OR u.id = ?`;

  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // Chuyển đổi profile_picture từ LONGBLOB thành base64
    const usersWithBase64Images = results.map((user) => {
      return {
        id: user.id,
        email: user.email,
        profilePicture: user.profile_picture
          ? `data:image/png;base64,${user.profile_picture.toString("base64")}`
          : null,
      };
    });

    res.status(200).json(usersWithBase64Images);
  });
});

//Endpoint để xóa teammate
app.delete(
  "/delete-teammate/:userId/:partnerId",
  ensureDbConnection,
  (req, res) => {
    const { userId, partnerId } = req.params;
    const query = "DELETE FROM teammates WHERE user_id = ? AND partner_id = ?";

    db.query(query, [userId, partnerId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ message: "Teammate deleted successfully" });
    });
  }
);

//Endpoint để lấy ds teams
app.get("/teams/:userId", ensureDbConnection, (req, res) => {
  const { userId } = req.params;
  const query =
    "SELECT t.id, t.name FROM team t JOIN team_members tm ON t.id = tm.team_id WHERE tm.user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
});

// Endpoint để tạo team và thêm user vào team
app.post("/create-team/:userId", ensureDbConnection, (req, res) => {
  const { teamName, emails } = req.body;
  const { userId } = req.params;

  // Đảm bảo rằng tên team và danh sách email được cung cấp
  if (!teamName || !emails || !Array.isArray(emails) || emails.length === 0) {
    return res
      .status(400)
      .json({ error: "Team name and at least one email are required" });
  }

  // Bước 1: Xác định mối quan hệ và kiểm tra email
  const getPartnersQuery =
    "SELECT partner_id FROM teammates WHERE user_id = ? UNION SELECT ? AS partner_id";
  db.query(getPartnersQuery, [userId, userId], (err, results) => {
    if (err) {
      console.error("Error fetching partners:", err);
      return res.status(500).json({ error: err.message });
    }

    const allowedUserIds = results.map((row) => row.partner_id);

    // Bước 2: Lấy user_id từ email
    const getUserIdsQuery =
      "SELECT id FROM users WHERE email IN (?) AND id IN (?)";
    db.query(getUserIdsQuery, [emails, allowedUserIds], (err, results) => {
      if (err) {
        console.error("Error fetching user IDs:", err);
        return res.status(500).json({ error: err.message });
      }

      const userIdsToAdd = results.map((row) => row.id);

      // Bước 3: Tạo team mới
      const createTeamQuery = "INSERT INTO team (name) VALUES (?)";
      db.query(createTeamQuery, [teamName], (err, result) => {
        if (err) {
          console.error("Error creating team:", err);
          return res.status(500).json({ error: err.message });
        }

        const teamId = result.insertId;

        // Bước 4: Thêm user vào team
        const addUsersQuery =
          "INSERT INTO team_members (user_id, team_id) VALUES ?";
        const values = userIdsToAdd.map((id) => [id, teamId]);
        db.query(addUsersQuery, [values], (err) => {
          if (err) {
            console.error("Error adding users to team:", err);
            return res.status(500).json({ error: err.message });
          }

          res.status(201).json({
            message: "Team created and users added successfully",
            teamId,
          });
        });
      });
    });
  });
});

// Endpoint để lấy danh sách file
app.get("/files/:userId", (req, res) => {
  const { userId } = req.params;
  const query = "SELECT*FROM files WHERE folder_id IS NULL AND user_id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching files from database:", err);
      res.status(500).send("Error fetching files");
      return;
    }
    res.json(result);
  });
});

app.get("/all-files/:userId", (req, res) => {
  const { userId } = req.params;
  const query = "SELECT*FROM files";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching files from database:", err);
      res.status(500).send("Error fetching files");
      return;
    }
    res.json(result);
  });
});

// Endpoint để lấy danh sách file
app.get("/file/:userId", (req, res) => {
  const { userId } = req.params;
  const query = "SELECT*FROM files WHERE user_id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching files from database:", err);
      res.status(500).send("Error fetching files");
      return;
    }
    res.json(result);
  });
});

// Endpoint để xem trước file
app.get("/file/:id/preview", ensureDbConnection, (req, res) => {
  const fileId = req.params.id;

  try {
    const file = "SELECT name, data FROM files WHERE id = ?";
    db.query(file, [fileId], (err, results) => {
      if (err) {
        console.error("Error fetching file:", err);
        return res.status(500).json({ error: "Error fetching file" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "File not found" });
      }
      const { name, data } = results[0];
      const fileExtension = name.split(".").pop();
      const mimeType = mime.lookup(fileExtension);
      res.setHeader("Content-Type", mimeType);
      res.send(data);
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ error: "Error fetching file" });
  }
});

// Endpoint để upload files
app.post("/upload/:userId", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const file = req.file;
  const name = file.originalname; // Tên file sau khi được chuyển đổi encoding
  const data = file.buffer;
  const { userId } = req.params;
  const query = "INSERT INTO files (name, data, user_id) VALUES (?, ?, ?)";
  db.query(query, [name, data, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error saving file", error: err });
    }
    res.json({
      message: "File uploaded successfully",
      file: { id: result.insertId, name, updated_at: new Date() },
    });
  });
});

// Endpoint để đổi tên file
app.put("/files/:id", (req, res) => {
  const fileId = req.params.id;
  const newName = req.body.name;

  // Lấy tên file hiện tại từ database
  const query = "SELECT name FROM files WHERE id = ?";
  db.query(query, [fileId], (err, results) => {
    if (err) {
      console.error("Error fetching file name:", err);
      return res.status(500).send("Error fetching file name");
    }

    if (results.length === 0) {
      return res.status(404).send("File not found");
    }

    const currentFileName = results[0].name;
    const fileExtension = currentFileName.split(".").pop(); // Lấy phần mở rộng của file
    const newFileName = `${newName}.${fileExtension}`; // Tạo tên file mới với phần mở rộng cũ

    // Cập nhật tên file trong database
    const updateQuery =
      "UPDATE files SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    db.query(updateQuery, [newFileName, fileId], (updateErr) => {
      if (updateErr) {
        console.error("Error updating file name:", updateErr);
        return res.status(500).send("Error updating file name");
      }
      res.send({
        message: "File renamed successfully",
        updated_at: new Date(),
      });
    });
  });
});

// Endpoint để tải file
app.get("/files/:id", (req, res) => {
  const fileId = req.params.id;

  const query = "SELECT * FROM files WHERE id = ?";
  db.query(query, [fileId], (err, results) => {
    if (err) throw err;
    const file = results[0];

    // Mã hóa tên file theo RFC 5987 để xử lý ký tự đặc biệt
    const encodeRFC5987ValueChars = (str) => {
      return encodeURIComponent(str)
        .replace(/['()]/g, escape) // Ép buộc các ký tự đặc biệt
        .replace(/\*/g, "%2A")
        .replace(/%(7C|60|5E)/g, unescape);
    };

    const encodedFileName = encodeRFC5987ValueChars(file.name);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename*=UTF-8''${encodedFileName}`
    );
    res.setHeader("Content-Type", "application/octet-stream");

    // Cập nhật thời gian thay đổi cuối cùng
    const updateQuery =
      "UPDATE files SET updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    db.query(updateQuery, [fileId], (updateErr) => {
      if (updateErr) throw updateErr;
      res.send(file.data);
    });
  });
});

// Endpoint để xóa file
app.delete("/files/:id", (req, res) => {
  const fileId = req.params.id;

  const query = "DELETE FROM files WHERE id = ?";
  db.query(query, [fileId], (err, result) => {
    if (err) {
      console.error("Error deleting file from database:", err);
      res.status(500).send("Error deleting file");
      return;
    }

    res.send("File deleted successfully");
  });
});

// Endpoint để lấy danh sách các folder
app.get("/folders/:userId", ensureDbConnection, (req, res) => {
  const { userId } = req.params;
  const query = "SELECT*FROM folders WHERE user_id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching folders:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

// Endpoint để đổi tên folders
app.put("/folders/:id", (req, res) => {
  const folderId = req.params.id;
  const newName = req.body.name;

  // Lấy tên file hiện tại từ database
  const query = "SELECT name FROM folders WHERE id = ?";
  db.query(query, [folderId], (err, results) => {
    if (err) {
      console.error("Error fetching folder name:", err);
      return res.status(500).send("Error fetching folder name");
    }

    if (results.length === 0) {
      return res.status(404).send("Folder not found");
    }

    const newFolderName = `${newName}`;

    // Cập nhật tên file trong database
    const updateQuery =
      "UPDATE folders SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    db.query(updateQuery, [newFolderName, folderId], (updateErr) => {
      if (updateErr) {
        console.error("Error updating file name:", updateErr);
        return res.status(500).send("Error updating folder name");
      }
      res.send({
        message: "Folder renamed successfully",
        updated_at: new Date(),
      });
    });
  });
});

// Endpoint để tạo folder mới
app.post("/create-folder/:userId", ensureDbConnection, (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  // Đảm bảo rằng tên folder được cung cấp
  if (!name) {
    return res.status(400).json({ error: "Folder name is required" });
  }

  // Thực hiện truy vấn SQL để thêm folder vào cơ sở dữ liệu
  const query = "INSERT INTO folders (name, user_id) VALUES (?, ?)";
  db.query(query, [name, userId], (err, result) => {
    if (err) {
      console.error("Error creating folder:", err);
      return res.status(500).json({ error: err });
    }
    res
      .status(201)
      .json({ message: "Folder created successfully", id: result.insertId });
  });
});

// Endpoint để xóa folder
app.delete("/folders/:id", (req, res) => {
  const folderId = req.params.id;

  const query = "DELETE FROM folders WHERE id = ?";
  db.query(query, [folderId], (err, result) => {
    if (err) {
      console.error("Error deleting folder from database:", err);
      res.status(500).send("Error deleting folder");
      return;
    }
    res.send("Folder deleted successfully");
  });
});

// Endpoint để di chuyển file vào một folder
app.put("/move-file", ensureDbConnection, (req, res) => {
  const { fileId, folderId } = req.body;

  if (!fileId || !folderId) {
    return res
      .status(400)
      .json({ message: "File ID and Folder ID are required" });
  }

  // Thực hiện truy vấn SQL để cập nhật folder_id của file
  const query = "UPDATE files SET folder_id = ? WHERE id = ?";
  db.query(query, [folderId, fileId], (err, result) => {
    if (err) {
      console.error("Error moving file:", err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json({ message: "File moved successfully" });
  });
});

// Endpoint để lấy danh sách file trong một folder
app.get("/folders/:folderId/files", ensureDbConnection, (req, res) => {
  const { folderId } = req.params;

  // Thực hiện truy vấn SQL để lấy danh sách file trong folder
  const query = "SELECT id, name, updated_at FROM files WHERE folder_id = ?";
  db.query(query, [folderId], (err, results) => {
    if (err) {
      console.error("Error fetching files:", err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
});

// Endpoint để upload file vào một folder
app.post(
  "/upload-file/:folderId/:userId",
  upload.single("file"),
  (req, res) => {
    const { folderId, userId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    const name = file.originalname;
    const data = file.buffer;

    // Thực hiện truy vấn SQL để thêm file vào cơ sở dữ liệu
    const query =
      "INSERT INTO files (name, data, folder_id, user_id) VALUES (?, ?, ?, ?)";
    db.query(query, [name, data, folderId, userId], (err, result) => {
      if (err) {
        console.error("Error saving file:", err);
        return res.status(500).json({ error: err });
      }
      res.status(201).json({
        message: "File uploaded successfully",
        id: result.insertId,
        updated_at: new Date(),
      });
    });
  }
);

// Endpoint để xóa file từ folder
app.delete(
  "/folders/:folderId/files/:fileId",
  ensureDbConnection,
  (req, res) => {
    const { folderId, fileId } = req.params;

    // Thực hiện truy vấn SQL để xóa file từ folder
    const query = "DELETE FROM files WHERE folder_id = ? AND id = ?";
    db.query(query, [folderId, fileId], (err, result) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "File not found" });
      }
      res.status(200).json({ message: "File deleted successfully" });
    });
  }
);

// Endpoint để xóa file khỏi folder
app.put("/moveback-file/:fileId/:userId", ensureDbConnection, (req, res) => {
  const { fileId, userId } = req.params;

  // Thực hiện truy vấn SQL để cập nhật folder_id của file
  const query =
    "UPDATE files SET folder_id = NULL WHERE id = ? AND user_id = ?";
  db.query(query, [fileId, userId], (err, result) => {
    if (err) {
      console.error("Error removing file:", err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json({ message: "File removed successfully" });
  });
});

// Endpoint để tải file từ folder
app.get("/folders/:folderId/files/:fileId", ensureDbConnection, (req, res) => {
  const { folderId, fileId } = req.params;

  // Thực hiện truy vấn SQL để lấy file từ folder
  const query = "SELECT * FROM files WHERE folder_id = ? AND id = ?";
  db.query(query, [folderId, fileId], (err, results) => {
    if (err) {
      console.error("Error fetching file:", err);
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    const file = results[0];

    // Mã hóa tên file theo RFC 5987 để xử lý ký tự đặc biệt
    const encodeRFC5987ValueChars = (str) => {
      return encodeURIComponent(str)
        .replace(/['()]/g, escape) // Ép buộc các ký tự đặc biệt
        .replace(/\*/g, "%2A")
        .replace(/%(7C|60|5E)/g, unescape);
    };

    const encodedFileName = encodeRFC5987ValueChars(file.name);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename*=UTF-8''${encodedFileName}`
    );
    res.setHeader("Content-Type", "application/octet-stream");

    res.send(file.data);
  });
});

// Endpoint để lấy data của user
app.get("/user-data/:userId", ensureDbConnection, (req, res) => {
  const { userId } = req.params;
  const query =
    "SELECT first_name, last_name, phone_number, birthday, organization, role FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results[0]);
  });
});

// Endpoint để lấy danh sách users
app.get("/users", ensureDbConnection, (req, res) => {
  const query = "SELECT id, email, profile_picture FROM users";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // Chuyển đổi profile_picture từ LONGBLOB thành base64
    const usersWithBase64Images = results.map((user) => {
      return {
        id: user.id,
        email: user.email,
        profilePicture: user.profile_picture
          ? `data:image/png;base64,${user.profile_picture.toString("base64")}`
          : null,
      };
    });

    res.status(200).json(usersWithBase64Images);
  });
});

// Endpoint để upload ảnh profile của user vào bảng users
app.post("/upload-avatar/:userId", upload.single("file"), (req, res) => {
  const { userId } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const file = req.file;
  const data = file.buffer;

  // Thực hiện truy vấn SQL để cập nhật avatar cho user
  const query = "UPDATE users SET profile_picture = ? WHERE id = ?";
  db.query(query, [data, userId], (err, result) => {
    if (err) {
      console.error("Error saving avatar:", err);
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Avatar uploaded successfully" });
  });
});

// Endpoint để lấy ảnh profile của user
app.get("/avatar/:userId", (req, res) => {
  const { userId } = req.params;

  const query = "SELECT profile_picture FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching avatar:", err);
      return res.status(500).json({ error: err });
    }

    if (results.length === 0 || !results[0].profile_picture) {
      return res.status(404).json({ message: "Avatar not found" });
    }

    res.setHeader("Content-Type", "image/jpeg"); // Set the content type accordingly
    res.send(results[0].profile_picture);
  });
});

// Endpoint để cập nhật thông tin user
app.put("/update-user/:userId", ensureDbConnection, (req, res) => {
  const { userId } = req.params;
  const { first_name, last_name, phone_number, birthday, organization, role } =
    req.body;

  const query =
    "UPDATE users SET first_name = ?, last_name = ?, phone_number = ?, birthday = ?, organization = ?, role = ? WHERE id = ?";
  db.query(
    query,
    [first_name, last_name, phone_number, birthday, organization, role, userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ message: "User updated successfully" });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
