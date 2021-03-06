import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import logo from "../resources/logo.png";
import "./LoginPage.css";

import SubmitButton from "./components/SubmitButton";
import UsernameInput from "./components/UsernameInput";
import { setUsername } from "../store/actions/dashboardActions";
import { registerNewUser } from "../utils/wssConnection/wssConnection";
import { AppDispatch } from "../store/store";

type Props = {
  saveUsername(username: string): void;
};

const LoginPage = ({ saveUsername }: Props) => {
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    saveUsername(username);
    navigate("/dashboard");
  };

  return (
    <div className="login-page_container background_main_color">
      <div className="login-page_login_box background_secondary_color">
        <div className="login-page_logo_container">
          <img
            className="login-page_logo_image"
            src={logo}
            alt="VideoTalker Logo"
          />
        </div>
        <div className="login-page_title_container">
          <h2>Get on Board</h2>
        </div>
        <UsernameInput username={username} setUsername={setUsername} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch: AppDispatch) => {
  return {
    saveUsername: (username: string) => dispatch(setUsername(username)),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
