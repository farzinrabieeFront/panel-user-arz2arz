import React, { Component, createContext, useContext } from "react";
import * as io from "socket.io-client";
import { cookieServices } from "../services";

export const SocketConnectionContext = createContext({});
export const useSocketConnection = () => useContext(SocketConnectionContext);

export default class SocketConnection extends Component {
  socket = null;
  socket2 = null;

  socketUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://194.5.192.82:8089"
      : "https://socket.arz2arz.net";

  updateUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://194.5.192.82:8091"
      : "https://update.arz2arz.net";

  constructor(props) {
    super(props);

    this.socket = io.connect(`${this.socketUrl}`, {
      transports: ["websocket"],
      rejectUnauthorized: false,
      secure: true,
      reconnectionDelayMax: 30000,
      query: {
        accessToken: cookieServices.get("accessToken"),
        refreshToken: cookieServices.get("refreshToken"),
      },
    });

    this.secodSocket();
  }

  componentWillUnmount() {
    try {
      this.socket !== null && this.socket.disconnect();
    } catch (e) {
      // socket not connected
    }
  }

  disconnectSocket() {
    // this.socket.disconnect();
    // this.socket2.disconnect();
  }

  secodSocket() {
    this.socket2 = io.connect(`${this.updateUrl}`, {
      transports: ["websocket"],
      rejectUnauthorized: false,
      secure: true,
      reconnectionDelayMax: 30000,
    });
  }

  render() {
    return (
      <SocketConnectionContext.Provider
        value={{
          socket: this.socket,
          socket2: this.socket2,
          secodSocketHandler: this.secodSocket,
          disconnectSocket: this.disconnectSocket,
        }}
      >
        {this.props.children}
      </SocketConnectionContext.Provider>
    );
  }
}
