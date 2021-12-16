import React from "react";
import { connect } from "react-redux";
import {
  callStates,
  setCallRejected,
} from "../../../store/actions/callActions";
import { AppDispatch, RootState } from "../../../store/store";
import CallingDialog from "../CallingDialog/CallingDialog";
import CallRejectedDialog from "../CallRejectedDialog/CallRejectedDialog";
import IncomingCallDialog from "../IncomingCallDialog/IncomingCallDialog";
import LocalVideoView from "../LocalVideoView/LocalVideoView";
import RemoteVideoView from "../RemoteVideoView/RemoteVideoView";

interface Props {
  state: CallState;
  hideCallRejectedDialog(callRejected: CallRejected): void;
}

const DirectCall = ({ state, hideCallRejectedDialog }: Props) => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callingDialogVisible,
    callRejected,
  } = state;

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {callRejected.rejected && (
        <CallRejectedDialog
          reason={callRejected.reason}
          hideCallRejectedDialog={hideCallRejectedDialog}
        />
      )}
      {callState === callStates.CALL_REQUESTED && (
        <IncomingCallDialog callerUsername={callerUsername} />
      )}
      {callingDialogVisible && <CallingDialog />}
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    state: state.call,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    hideCallRejectedDialog: (callRejectedDetails: CallRejected) =>
      dispatch(setCallRejected(callRejectedDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectCall);
