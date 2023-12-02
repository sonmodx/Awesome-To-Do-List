import React from "react";
import styles from "./Task.module.css";

const Task = ({ task, description, deadline }) => {
  return (
    <div className={styles.task}>
      <div className={styles.head}>
        <input className="checkbox" type="checkbox" />
        <h3 className={styles.taskTitle}>{task}</h3>
      </div>

      <p className={styles.description}>{description}</p>
      <p className={styles.deadline}>{deadline}</p>
      <div className={styles.buttonGroup}>
        <i className={`fa-regular fa-pen-to-square ${styles.edit}`}></i>

        <i className={`fa-regular fa-trash-can ${styles.delete}`}></i>
      </div>
    </div>
  );
};

export default Task;
