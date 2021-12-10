import React from "react";

type Props = {
  handleSubmitButtonPressed(): void;
};

const SubmitButton = ({handleSubmitButtonPressed}: Props) => {
  return (
    <div className="login-page_button_container">
      <button
        className="login-page_button background_main_color text_main_color"
        onClick={handleSubmitButtonPressed}
      >
        Login
      </button>
    </div>
  );
};

export default SubmitButton;
