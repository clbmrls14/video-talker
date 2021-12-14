import React from 'react'
import { connect } from 'react-redux';
import { RootState } from '../../../store/store'
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';

interface Props {
    state: CallState;
}

const DirectCall = (props: Props) => {
    return (
        <>
            <LocalVideoView localStream={props.state.localStream} />
            {props.state.remoteStream && <RemoteVideoView remoteStream={props.state.remoteStream} />}
        </>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        state: state.call,
    };
};

export default connect(mapStateToProps)(DirectCall);
