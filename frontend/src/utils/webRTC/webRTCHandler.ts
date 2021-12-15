import {
  callStates,
  setCallerUsername,
  setCallingDialogVisible,
  setCallRejected,
  setCallState,
  setLocalStream,
} from "../../store/actions/callActions";
import * as wss from "../wssConnection/wssConnection";
import { store } from "../../store/store";

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE',
}

const defaultContraints = {
  video: true,
  audio: true,
};

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultContraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
    })
    .catch((err) => {
      console.log("error occurred when trying to get local stream");
      console.log(err);
    });
};

let connectedUserSocketId: number | null;

export const callToOtherUser = (calleeDetails: User) => {
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().dashboard.username,
    },
  });
};

export const handlePreOffer = (data: any) => {
  if (checkIfCallIsPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUsername(data.callerUsername));
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
  } else {
    wss.sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE
    });
  }
};

export const acceptIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED
  });
};

export const rejectIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED
  });

  resetCallData();
};

export const handlePreOfferAnswer = (data: any) => {
  store.dispatch(setCallingDialogVisible(false));

  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    // send webRTC offer
  } else {
    let rejectionReason: string;
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Callee is not able to answer';
    } else {
      rejectionReason = 'Call rejected';
    }
    store.dispatch(setCallRejected({
      rejected: true,
      reason: rejectionReason
    }));
  }
}

export const checkIfCallIsPossible = () => {
  return (
    !(store.getState().call.localStream === null ||
    store.getState().call.callState !== callStates.CALL_AVAILABLE)
  ); 
};

export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};
