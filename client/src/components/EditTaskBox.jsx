import React from "react";
import styles from "./EditTaskBox.module.css";
const EditTaskBox = ({ updateTask, editBox, setEditBox }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    const description = e.target.description.value;
    const deadline = e.target.deadline.value;
    const isDone = e.target.isDone.checked;
    console.log("Success", isDone);
    const formData = { task, description, deadline, isDone };
    setEditBox((prev) => ({ ...prev, isShow: false, formData: formData }));
    updateTask(editBox?.id, formData);
  };
  console.log(editBox);
  return (
    <div className={styles.editTaskBox}>
      <div className={styles.container}>
        <h4 className={styles.head}>Update Task</h4>
        <form id="editForm" onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <label htmlFor="task">Task :</label>
            <input
              id="task"
              defaultValue={editBox?.formData?.task}
              type="text"
              name="task"
              placeholder="Enter task's title (< 50)"
              required
              maxLength={50}
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="description">Description :</label>

            <textarea
              id="description"
              defaultValue={editBox?.formData?.description}
              type="text"
              name="description"
              placeholder="Describe ur task"
              rows="4"
              cols="20"
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="deadline">Deadline :</label>
            <input
              id="deadline"
              type="date"
              name="deadline"
              defaultValue={editBox?.formData?.deadline}
              required
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="isDone">Success :</label>
            <input
              id="isDone"
              type="checkbox"
              name="isDone"
              defaultChecked={editBox?.formData?.isDone}
            />
          </div>
          <div className={styles.answer}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => setEditBox((prev) => ({ ...prev, isShow: false }))}
            >
              CANCEL
            </button>
            <button type="submit">UPDATE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskBox;
