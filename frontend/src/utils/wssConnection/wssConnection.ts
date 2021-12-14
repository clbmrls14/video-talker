import socketClient from "socket.io-client";
import { store } from "../../store/store";
import * as dashboardActions from "../../store/actions/dashboardActions";
import * as webRTCHandler from "../webRTC/webRTCHandler";

const SERVER = "http://localhost:5000";

let socket: any;

const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

export const connectWithWebSocket = () => {
  socket = socketClient(SERVER);
  socket.on("connection", () => {
    console.log("successfully connected with wss socket");
    console.log(socket.id);
  });

  socket.on("broadcast", (data: any) => {
    handleBroadcastEvent(data);
  });

  // listeners related to direct call

  socket.on("pre-offer", (data: any) => {
    webRTCHandler.handlePreOffer(data);
  });
};

export const registerNewUser = (username: string) => {
  socket.emit("register-new-user", {
    username: username,
    socketId: socket.id,
  });
};

// emitting events to server related with direct call

export const sendPreOffer = (data: any) => {
  socket.emit("pre-offer", data);
};

const handleBroadcastEvent = (data: any) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      const activeUsers: User[] = data.activeUsers.filter(
        (activeUser: User) => activeUser.socketId !== socket.id
      );
      store.dispatch(dashboardActions.setActiveUsers(activeUsers));
      break;
    default:
      break;
  }
};
