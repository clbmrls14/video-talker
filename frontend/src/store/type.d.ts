type AppState = {
  username: string;
  activeUsers: User[];
};

type User = {
  socketId: number;
  username: string;
};
