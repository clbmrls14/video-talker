import socketClient from "socket.io-client";
import store from "../../store/store";
import * as dashboardActions from "../../store/actions/dashboardActions";

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
};

export const registerNewUser = (username: string) => {
  socket.emit("register-new-user", {
    username: username,
    socketId: socket.id,
  });
};

const handleBroadcastEvent = (data: any) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      store.dispatch(dashboardActions.setActiveUsers(data.activeUsers));
      break;
    default:
      break;
  }
};
