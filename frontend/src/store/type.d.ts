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
  callRejected: CallRejected;
};

type CallRejected = {
  rejected: boolean;
  reason: string;
};

type User = {
  socketId: number;
  username: string;
};
