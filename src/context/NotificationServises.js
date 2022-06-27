import React, {
  cloneElement,
  Component,
  createContext,
  createRef,
  useContext,
} from "react";
import { Toastify } from "../utils";
import { SocketConnectionContext } from "./SocketConnection";
import CustomizedToast from "../common/element/toast/Toast";
import { toast } from "react-toastify";

export const SocketContext = createContext({});
export const useNotification = () => useContext(SocketContext);

export default class NotificationServises extends Component {
  static contextType = SocketConnectionContext;
  state = {
    notification: {},
  };
  socket = null;

  constructor(props) {
    super(props);
    this.notifRef = createRef();
  }

  componentDidMount() {
    this.socket = this.context.socket;
    this.socket.on("notification", (notification) => {
      this.setState({
        notification,
      });
      toast(<CustomizedToast data={notification} />, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        className: "notif-toast",
        draggable: true,
        progress: undefined,
        bodyStyle: notification,
      });
    });
  }

  // checkType(notif) {
  //   switch (notif.type) {
  //     case "spotMarket":
  //       break;

  //     default:
  //       break;
  //   }
  // }

  notifActions(params) {}

  render() {
    let { children } = this.props;

    return (
      <SocketContext.Provider
        value={{
          notification: this.state.notification,
        }}
      >
        {cloneElement(children, { ref: this.notifRef })}
      </SocketContext.Provider>
    );
  }
}
