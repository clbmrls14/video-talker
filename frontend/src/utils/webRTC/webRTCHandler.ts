import {
  callStates,
  setCallerUsername,
  setCallingDialogVisible,
  setCallState,
  setLocalStream,
} from "../../store/actions/callActions";
import * as wss from "../wssConnection/wssConnection";
import { store } from "../../store/store";

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

let connectedUserSocketId: number;

export const callToOtherUser = (calleeDetails: User) => {
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: (getState: () => DashboardState) => getState().username,
    },
  });
};

export const handlePreOffer = (data: any) => {
  connectedUserSocketId = data.callerSocketId;
  store.dispatch(setCallerUsername(data.callerUsername));
  store.dispatch(setCallState(callStates.CALL_REQUESTED));
};
