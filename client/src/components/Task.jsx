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
  const formattedDescription = description.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < description.length - 1 && <br />}
    </React.Fragment>
  ));
  return (
    <div className={styles.task}>
      <div className={styles.head}>
        <input className="checkbox" type="checkbox" title="See description" />
        <h3 className={isDone ? styles.taskTitleSuccess : styles.taskTitle}>
          {task}
        </h3>
      </div>

      <p className={styles.description}>{formattedDescription}</p>
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
          title="Edit task"
        ></i>

        <i
          className={`fa-regular fa-trash-can ${styles.delete}`}
          onClick={() => setShowAlert({ id: id, isShow: true, task: task })}
          title="Delete task"
        ></i>
      </div>
    </div>
  );
};

export default Task;
