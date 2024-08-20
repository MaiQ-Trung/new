<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
}

ol {
  list-style: none;
}

.lv1 {
  position: relative;
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin-top: 20px;
  background-color: white;
  width: 180px;
  height: 80px;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.lv1::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 40px;
  background-color: black;
}

.lv1::after {
  content: "";
  position: absolute;
  top: 150%;
  left: 50%;
  transform: translateX(-52%);
  width: 1900px;
  height: 3px;
  background-color: black;
}

.lv2-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 60px;
  margin-top: 50px;
}

.group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.lv2-g {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.lv2 {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.lv2-g::before {
  content: "";
  position: absolute;
  top: -13%;
  left: 54%;
  width: 3px;
  height: 30px;
  background-color: black;
}

.lv2::before {
  content: "";
  position: absolute;
  top: -13%;
  left: 51%;
  width: 3px;
  height: 30px;
  background-color: black;
}

.lv2::after {
  content: "";
  position: absolute;
  top: 40%;
  left: 50%;
  width: 3px;
  height: 40px;
  background-color: black;
}

.text {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 120px;
  height: 70px;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

h2 {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.lv3-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  margin-right: 43px;
  margin-top: 20px;
}

.lv3-wrapper-HR {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  margin-right: 30px;
  margin-top: 20px;
}

.lv3 {
  text-align: center;
  position: relative;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin-top: 50px;
  background-color: white;
  width: 120px;
  height: 70px;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.lv3::before {
  content: "";
  position: absolute;
  top: -40%;
  left: 52%;
  width: 3px;
  height: 28px;
  background-color: black;
}

.lv3-wrapper::before {
  content: "";
  position: absolute;
  top: 57%;
  left: 20%;
  width: 340px;
  height: 3px;
  background-color: black;
}

.lv3-wrapper-HR::before {
  content: "";
  position: absolute;
  top: 57%;
  left: 36%;
  width: 170px;
  height: 3px;
  background-color: black;
}
</style>
