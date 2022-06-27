import { toast, cssTransition } from "react-toastify";
import { BsInfoCircle } from "react-icons/all";
import General from "./components/General";
const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
});
const Zoom = cssTransition({
  collapse: false,
  enter: "zoomIn",
  exit: "zoomOut",
});

class Notification {
  checkType(notif) {
    this.general(notif);
    // const { type } = notif;
    // switch (type) {
    //   case "general":
    //     this.general(notif);
    //     break;

    //   default:
    //     break;
    // }
  }

  general(notif) {
    let comp = () => (
      <div className="d-flex">
        <div className="ms-2">
          <BsInfoCircle className="text-blue" size={20} />
        </div>
        <div>
          <div className="text-blue fw-700">{notif.title}</div>
          <div className="size-5 mt-1">
            {notif.description}
          </div>
        </div>
      </div>
    );
    toast(comp, {
      transition: bounce,
      position: toast.POSITION.TOP_CENTER,
      className: "notification-general",
      closeButton: null,
      // icon: <BsInfoCircle className="text-blue" size={20} />,
      autoClose: 3000,
      // autoClose: false,
      // progress: undefined,
      // hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  ticket(notif) {}
  spotDeposit(notif) {}
  spotWithdraw(notif) {}
  fiatWithdraw(notif) {}
  spotMarket(notif) {}
  spotLimit(notif) {}
  fiatMarket(notif) {}
  idVerification(notif) {}
  bankVerification(notif) {}
}
export default new Notification();

// 'ticket', 'general', 'spotDeposit', 'spotWithdraw', 'fiatWithdraw',
//             'spotMarket', 'spotLimit', 'fiatMarket', 'idVerification', 'bankVerification'
