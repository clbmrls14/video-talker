import * as callActions from "../actions/callActions";

const initialState: CallState = {
  localStream: null,
  remoteStream: null,
  callState: callActions.callStates.CALL_UNAVAILABLE,
  callingDialogVisible: false,
  callerUsername: "",
  callRejected: {
    rejected: false,
    reason: "",
  },
};

const reducer = (
  state: CallState = initialState,
  action: callActions.Actions
) => {
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream,
      };
    case callActions.CALL_SET_CALL_STATE:
      return {
        ...state,
        callState: action.callState,
      };
    case callActions.CALL_SET_CALLING_DIALOG_VISIBLE:
      return {
        ...state,
        callingDialogVisible: action.isVisible,
      };
    case callActions.CALL_SET_CALLER_USERNAME:
      return {
        ...state,
        callerUsername: action.callerUsername,
      };
    case callActions.CALL_SET_CALL_REJECTED:
      return {
        ...state,
        callRejected: action.callRejected,
      };
    case callActions.CALL_SET_REMOTE_STREAM:
      return {
        ...state,
        remoteStream: action.remoteStream,
      }
    default:
      return state;
  }
};

export default reducer;
