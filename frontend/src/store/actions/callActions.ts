export const callStates = {
  CALL_UNAVAILABLE: "CALL_UNAVAILABLE",
  CALL_AVAILABLE: "CALL_AVAILABLE",
  CALL_REQUESTED: "CALL_REQUESTED",
  CALL_IN_PROGRESS: "CALL_IN_PROGRESS",
};

export const CALL_SET_LOCAL_STREAM = "CALL.SET_LOCAL_STREAM";
export const CALL_SET_CALL_STATE = "CALL.SET_CALL_STATE";
export const CALL_SET_CALLING_DIALOG_VISIBLE =
  "CALL.SET_CALLING_DIALOG_VISIBLE";
export const CALL_SET_CALLER_USERNAME = "CALL.SET_CALLER_USERNAME";
export const CALL_SET_CALL_REJECTED = "CALL.SET_CALL_REJECTED";

export const setLocalStream = (localStream: MediaStream) => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    localStream,
  } as const;
};

export const setCallState = (callState: string) => {
  return {
    type: CALL_SET_CALL_STATE,
    callState,
  } as const;
};

export const setCallingDialogVisible = (isVisible: boolean) => {
  return {
    type: CALL_SET_CALLING_DIALOG_VISIBLE,
    isVisible,
  } as const;
};

export const setCallerUsername = (callerUsername: string) => {
  return {
    type: CALL_SET_CALLER_USERNAME,
    callerUsername,
  } as const;
};

export const setCallRejected = (callRejectedDetails: CallRejected) => {
  return {
    type: CALL_SET_CALL_REJECTED,
    callRejected: {
      rejected: callRejectedDetails.rejected,
      reason: callRejectedDetails.reason,
    },
  } as const;
};

export type Actions =
  | ReturnType<typeof setLocalStream>
  | ReturnType<typeof setCallState>
  | ReturnType<typeof setCallingDialogVisible>
  | ReturnType<typeof setCallerUsername>
  | ReturnType<typeof setCallRejected>;
