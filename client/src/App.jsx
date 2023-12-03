import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";
import Task from "./components/Task";
import AlertBox from "./components/AlertBox";
import EditTaskBox from "./components/EditTaskBox";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAlert, setShowAlert] = useState({
    isShow: false,
    id: null,
    task: null,
  });
  const [editBox, setEditBox] = useState({
    isShow: false,
    id: null,
    formData: null,
  });

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
    console.log(description);
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

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/deleteTask/${id}`);
      if (res.status === 200) {
        const filterTask = tasks.filter((task) => task.id !== id);
        setTasks(filterTask);
      }
    } catch (error) {
      console.error("Error when delete task, error msg :", error.message);
    }
  };

  const updateTask = async (id, formData) => {
    try {
      const res = await axios.patch(
        `http://localhost:3001/updateTask/${id}`,
        formData
      );

      if (res.status === 200) {
        getAllTasks();
      }
    } catch (error) {
      console.error("Error when update task, error msg :", error.message);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className={styles.app}>
      {showAlert?.isShow && (
        <AlertBox
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          deleteTask={deleteTask}
        />
      )}
      {editBox?.isShow && (
        <EditTaskBox
          updateTask={updateTask}
          editBox={editBox}
          setEditBox={setEditBox}
        />
      )}
      <h1 className={styles.toDoList}>TO-DO-LIST</h1>

      <form id="createdForm" onSubmit={addTask}>
        <h2 className={styles.addTask}>ADD TASK</h2>
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
        <button className={styles.submitBtn} type="submit">
          SUBMIT
        </button>
      </form>

      <h2 className={styles.allTasks}>&lt;ALL TASKS &#47;&gt;</h2>
      <div className={styles.taskContainer}>
        {tasks?.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            task={task.task}
            description={task.description}
            deadline={task.deadline}
            isDone={task.isDone}
            setShowAlert={setShowAlert}
            setEditBox={setEditBox}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
