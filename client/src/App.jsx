import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";
import Task from "./components/Task";

function App() {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/getAllTasks");
      const { data } = res;
      setTasks(data);
      console.log("tasks", data);
    } catch (error) {
      console.error("Error when get all tasks, error msg :", error.message);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    const description = e.target.description.value || "No description";
    const deadline = e.target.deadline.value;
    try {
      const res = await axios.post("http://localhost:3001/addTask", {
        task: task,
        description: description,
        deadline: deadline,
      });
      if (res.status === 200) {
        e.target.task.value = "";
        e.target.description.value = "";
        e.target.deadline.value = "";
        getAllTasks();
      }
    } catch (error) {
      console.error("Error when add task, error msg :", error.message);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className={styles.app}>
      <h1>TO-DO-LIST</h1>
      <h2>ADD TASK</h2>
      <form id="createdForm" onSubmit={addTask}>
        <div className={styles.inputField}>
          <label htmlFor="task">task :</label>
          <input
            id="task"
            type="text"
            name="task"
            placeholder="Enter task's title (< 50)"
            required
            maxLength={50}
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="description">description :</label>
          <br />
          <textarea
            id="description"
            type="text"
            name="description"
            placeholder="Describe ur task"
            rows="4"
            cols="20"
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="deadline">deadline :</label>
          <input id="deadline" type="date" name="deadline" required />
        </div>
        <button type="submit">SUBMIT</button>
      </form>
      <br />
      <hr />
      <br />
      <h2>ALL TASKS</h2>
      <div className={styles.taskContainer}>
        {tasks?.map((task) => (
          <Task
            key={task.id}
            task={task.task}
            description={task.description}
            deadline={task.deadline}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
