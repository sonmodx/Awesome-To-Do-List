import React from "react";
import styles from "./Task.module.css";

const Task = ({
  id,
  task,
  description,
  deadline,
  isDone,
  setShowAlert,
  setEditBox,
}) => {
  return (
    <div className={styles.task}>
      <div className={styles.head}>
        <input className="checkbox" type="checkbox" />
        <h3 className={isDone ? styles.taskTitleSuccess : styles.taskTitle}>
          {task}
        </h3>
      </div>

      <p className={styles.description}>{description}</p>
      <p className={styles.deadline}>{deadline}</p>
      <div className={styles.buttonGroup}>
        <i
          className={`fa-regular fa-pen-to-square ${styles.edit}`}
          onClick={() =>
            setEditBox({
              id: id,
              isShow: true,
              formData: { task, deadline, description, isDone },
            })
          }
        ></i>

        <i
          className={`fa-regular fa-trash-can ${styles.delete}`}
          onClick={() => setShowAlert({ id: id, isShow: true, task: task })}
        ></i>
      </div>
    </div>
  );
};

export default Task;
