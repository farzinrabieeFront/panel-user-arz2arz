// import { useContext } from "react";
// import ConfirmContext from "../store/ConfirmContext";
// import { HIDE_CONFIRM, SHOW_CONFIRM } from "../store/Reducer";

import { useEffect } from "react";
import { createPortal } from "react-dom";

// let resolveCallback;
export default function useConfirm() {
  // const [confirmState, dispatch] = useContext(ConfirmContext);
  // useEffect(() => {

  //   createPortal(
  //     <div className="portal-overlay"></div>,
  //     document.getElementById("root")
  //   );
  // }, []);
  const portal = () => {
    //     closeConfirm();
    //     resolveCallback(true);
  };
  
  const onConfirm = () => {
    //     closeConfirm();
    //     resolveCallback(true);
  };

  const onCancel = () => {

    //     closeConfirm();
    //     resolveCallback(false);
  };
  const confirm = (text) => {

    //     dispatch({
    //         type: SHOW_CONFIRM,
    //         payload: {
    //             text
    //         }
    //     });
    //     return new Promise((res, rej) => {
    //         resolveCallback = res;
    //     });
  };

  const closeConfirm = () => {
    //     dispatch({
    //         type: HIDE_CONFIRM
    //     });
  };

  // return { confirm, onConfirm, onCancel, confirmState };
  return { confirm, onConfirm, onCancel };
}
