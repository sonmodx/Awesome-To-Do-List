import React from "react";
import styles from "./AlertBox.module.css";
const AlertBox = ({ showAlert, setShowAlert, deleteTask }) => {
  const handleConfirm = () => {
    setShowAlert((prev) => ({ ...prev, isShow: false }));
    deleteTask(showAlert?.id);
  };
  return (
    <div className={styles.alertBox}>
      <div className={styles.container}>
        <h4 className={styles.question}>
          Are you sure to delete &#40;{showAlert?.task}&#41; task
        </h4>
        <div className={styles.answer}>
          <button className={styles.confirm} onClick={handleConfirm}>
            CONFIRM
          </button>
          <button
            className={styles.reject}
            onClick={() => setShowAlert((prev) => ({ ...prev, isShow: false }))}
          >
            REJECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
