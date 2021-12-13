import * as dashboardActions from "../actions/dashboardActions";

const initialState: AppState = {
  username: "",
  activeUsers: [],
};

const reducer = (state: AppState[], action: dashboardActions.Actions) => {
  switch (action.type) {
    case dashboardActions.DASHBOARD_SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case dashboardActions.DASHBOARD_SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.activeUsers,
      };
    default:
      return initialState;
  }
};

export default reducer;
