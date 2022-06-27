import { createContext, useContext } from "react";
import Styles from "./DialogContainer.module.scss";
export const DialogContext = createContext({});

export const useDialog = () => useContext(DialogContext);

export default function DialogContainer() {
  return (
    <div className="dialog-container">
      <div className={Styles.overlay}>
        <div className={Styles.dialog}>
          <div className={Styles.dialogContent}>
            <h2 className={Styles.dialogTitle}>Delete a task?</h2>
            <p className={Styles.dialogDescription}>
              Are you sure you want to delete this task?
            </p>
          </div>

          <hr />

          <div className={Styles.dialogFooter}>
            <button className={Styles.dialogCancel}>لغو</button>
            <button className={Styles.dialogConfirm}>ادامه</button>
          </div>
        </div>
      </div>
    </div>
  );
}
