import React from "react";
import ActiveUsersList from "./ActiveUsersList";

import userAvatar from "../../../resources/userAvatar.png";

type Props = {
  activeUser: User;
};

const ActiveUsersListItem = (props: Props) => {
  const handleListItemPressed = () => {
    // call a user
  };

  return (
    <div className="active_user_list_item" onClick={handleListItemPressed}>
      <div className="active_user_list_image_container">
        <img className="active_user_list_image" src={userAvatar} />
      </div>
      <span className="active_user_list_text">{props.activeUser.username}</span>
    </div>
  );
};

export default ActiveUsersListItem;
