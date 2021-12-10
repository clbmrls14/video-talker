import React from "react";

import ActiveUsersListItem from "./ActiveUsersListItem";

import "./ActiveUsersList.css";
import { connect } from "react-redux";


const ActiveUsersList = ({dashboard}: any) => {
  return (
    <div className="active_user_list_container">
      {dashboard.activeUsers.map((activeUser: User) => (
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (dashboard: any) => ({...dashboard});

export default connect(mapStateToProps)(ActiveUsersList);
