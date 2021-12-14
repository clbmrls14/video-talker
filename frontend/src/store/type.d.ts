type DashboardState = {
  username: string;
  activeUsers: User[];
};

type CallState = {
  localStream: any;
  remoteStream: any;
}

type User = {
  socketId: number;
  username: string;
};
