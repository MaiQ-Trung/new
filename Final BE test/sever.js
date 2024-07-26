const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 3000;
const secretKey =
  "409760be8ad4de38ec084202a4ac97116d29df8e28f40c31768a0a0ef95c1ea0";
app.use(bodyParser.json());
app.use(cors());

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

    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, userId });
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

    // Thêm item mới với ID mới
    const addItemQuery =
      "INSERT INTO projects (id, name, user_id, created_at) VALUES (?, ?, ?, NOW())";
    db.query(addItemQuery, [newId, name, userId], (err, result) => {
      if (err) {
        console.error("Error inserting new project:", err);
        return res.status(500).json({ error: err });
      }
      res.status(201).json({
        message: "Item added successfully",
        id: newId,
        user_id: userId,
        created_at: new Date(),
      });
    });
  });
});

// Endpoint to mark a project
app.post('/mark-project', (req, res) => {
  const { id, name } = req.body;

  // Insert project into database
  const query = 'INSERT INTO marked_projects (id, name) VALUES (?, ?)';
  db.query(query, [id, name], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Project marked successfully' });
  });
});

app.delete('/unmark-project', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  try {
    // Assuming you have a table `marked_projects` and you want to remove the entry
    db.query('DELETE FROM marked_projects WHERE id = ?', [id]);
    res.status(200).json({ message: 'Project unmarked successfully' });
  } catch (error) {
    console.error('Error unmarking project:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to get marked project
app.get('/markedProject', (req,res) => {
  const {id, name} = req.body;

  const sql = 'SELECT*FROM marked_projects';
  db.query(sql, [id,name], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
})
// Endpoint thêm item mới
app.post("/add-item", ensureDbConnection, (req, res) => {
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
// Tạo endpoint để xóa project
app.delete("/delete-project/:id", ensureDbConnection, (req, res) => {
  const { id } = req.params;

  const deleteItemsQuery = "DELETE FROM todolist WHERE project_id = ?";
  db.query(deleteItemsQuery, [id], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error deleting items from todolist" });
    }

    const query = "DELETE FROM projects WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(200).json({ message: "Project deleted successfully" });
    });
  });
});
// Tạo endpoint để lấy danh sách projects
app.get("/main/projects/:userId", ensureDbConnection, (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT p.id, p.name, p.created_at
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

// Endpoint lấy danh sách công việc (todos) dựa trên project_id
app.get("/todo/:projectId", ensureDbConnection, (req, res) => {
  const { projectId } = req.params;
  // Query để kiểm tra project_id có tồn tại trong bảng projects và lấy danh sách công việc từ todolist
  const query = `
    SELECT t.id, t.name, t.status
    FROM todolist t
    INNER JOIN projects p ON t.project_id = p.id
    WHERE p.id = ?
  `;

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

// Endpoint xóa item
app.delete("/delete-item/:id", ensureDbConnection, (req, res) => {
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

// Endpoint cập nhật status của item sau khi drop từ todo sang done
app.put("/update-status", ensureDbConnection, (req, res) => {
  const { id, status } = req.body;

  const query = "UPDATE todolist SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: "Status updated successfully" });
  });
});

// Endpoint lấy danh sách người dùng
app.get("/users", ensureDbConnection, (req, res) => {
  const query = "SELECT id, email, password FROM users";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
