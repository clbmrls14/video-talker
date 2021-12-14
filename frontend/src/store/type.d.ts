type DashboardState = {
  username: string;
  activeUsers: User[];
};

type CallState = {
  localStream: any;
  remoteStream: any;
  callState: string;
  callingDialogVisible: boolean;
  callerUsername: string;
};

type User = {
  socketId: number;
  username: string;
};
