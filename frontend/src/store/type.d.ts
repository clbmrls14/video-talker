interface IState {
  username: string;
  activeUsers: User[];
}

type State = {
  username: string;
  activeUsers: User[];
};

type Action = {
  type: string;
  username?: string;
  activeUsers?: User[];
};

type DispatchType = (args: Action) => Action;

type User = {
  socketId: number;
  username: string;
};
