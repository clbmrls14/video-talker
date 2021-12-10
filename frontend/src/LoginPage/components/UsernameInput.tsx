import React from "react";

type Props = {
  username: string;
  setUsername(username: string): void;
};

const UsernameInput = ({username, setUsername}: Props) => {
  return (
    <div className="login-page_input_container">
      <input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        className="login-page_input background_main_color text_main_color"
      />
    </div>
  );
};

export default UsernameInput;
