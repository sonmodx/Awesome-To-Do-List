const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "lists",
  dateStrings: ["DATE", "DATETIME"],
});

const app = express();

app.use(cors());
app.use(express.json());

//READ
app.get("/getAllTasks", (req, res) => {
  const sql = "SELECT * FROM `todo-list` ORDER BY `deadline`";
  connection.query(sql, (error, data) => {
    if (error) return res.json(error);
    console.log(data);
    return res.json(data);
  });
});

//CREATE
app.post("/addTask", (req, res) => {
  const { task, deadline, description } = req.body;

  if (!task || !deadline || !description)
    return res.status(400).json({ message: "Please fullfill the empty input" });

  const sql =
    "INSERT INTO `todo-list` (task, deadline, description, isDone) VALUES (?, ?, ?, ?)";
  connection.query(sql, [task, deadline, description, false], (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data.insertId);
  });
});

//UPDATE
app.patch("/updateTask/:id", (req, res) => {
  const { task, deadline, description, isDone } = req.body;
  console.log(req.body);
  const id = req.params.id;
  const sql =
    "UPDATE `todo-list` SET `task` = ?, `deadline` = ?, `description` = ?, `isDone` = ? WHERE id = ?";
  connection.query(
    sql,
    [task, deadline, description, isDone, id],
    (error, data) => {
      if (error) return res.json(error);

      return res.json(data);
    }
  );
});

//DELETE
app.delete("/deleteTask/:id", (req, res) => {
  const sql = "DELETE FROM `todo-list` WHERE id = ?";
  const id = req.params.id;
  connection.query(sql, id, (error, data) => {
    if (error) return res.status(500).json(error);
    return res
      .status(200)
      .json({ message: `Successfully delete task id: ${id}` });
  });
});

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
