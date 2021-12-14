import React from "react";
import { connect } from "react-redux";
import { callStates } from "../../../store/actions/callActions";
import { RootState } from "../../../store/store";
import CallingDialog from "../CallingDialog/CallingDialog";
import CallRejectedDialog from "../CallRejectedDialog/CallRejectedDialog";
import IncomingCallDialog from "../IncomingCallDialog/IncomingCallDialog";
import LocalVideoView from "../LocalVideoView/LocalVideoView";
import RemoteVideoView from "../RemoteVideoView/RemoteVideoView";

interface Props {
  state: CallState;
}

const DirectCall = ({ state }: Props) => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callingDialogVisible,
  } = state;

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {/* {<CallRejectedDialog />} */}
      {callState == callStates.CALL_REQUESTED && (
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

export default connect(mapStateToProps)(DirectCall);
