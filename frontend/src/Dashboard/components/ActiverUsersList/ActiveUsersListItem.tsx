import React from "react";

import userAvatar from "../../../resources/userAvatar.png";
import { callStates } from "../../../store/actions/callActions";
import { callToOtherUser } from "../../../utils/webRTC/webRTCHandler";

type Props = {
  activeUser: User;
  callState: CallState;
};

const ActiveUsersListItem = ({ activeUser, callState }: Props) => {
  const handleListItemPressed = () => {
    if (callState.callState === callStates.CALL_AVAILABLE) {
      callToOtherUser(activeUser);
    }
  };

  return (
    <div className="active_user_list_item" onClick={handleListItemPressed}>
      <div className="active_user_list_image_container">
        <img className="active_user_list_image" src={userAvatar} />
      </div>
      <span className="active_user_list_text">{activeUser.username}</span>
    </div>
  );
};

export default ActiveUsersListItem;
