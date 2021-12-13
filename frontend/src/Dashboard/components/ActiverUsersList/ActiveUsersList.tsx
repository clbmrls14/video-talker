import React from "react";

import ActiveUsersListItem from "./ActiveUsersListItem";

import "./ActiveUsersList.css";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";

interface Props {
  state: AppState;
}

const ActiveUsersList = (props: Props) => {
  return (
    <div className="active_user_list_container">
      {props.state.activeUsers.map((activeUser: User) => (
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    state: state.dashboard,
  };
};

export default connect(mapStateToProps)(ActiveUsersList);
