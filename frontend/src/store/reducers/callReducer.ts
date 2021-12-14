import * as callActions from "../actions/callActions";

const initialState: CallState = {
  localStream: null,
  remoteStream: null
};

const reducer = (state: CallState[], action: callActions.Actions) => {
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream
      };
    default:
      return initialState;
  }
};

export default reducer;