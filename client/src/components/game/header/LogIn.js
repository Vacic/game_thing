import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { hideMessage, login, setMessage } from "../../../redux";
import Message from "../../helperComponents/notifications/Message";
import Spinner from "../../helperComponents/Spinner";

const LogIn = ({
  isLoginHidden,
  toggleLogin,
  login,
  setMessage,
  isLoading,
  showMsg,
  hideMessage,
}) => {
  useEffect(() => {
    loginEmail.current.focus();

    const hideLoginOnOutsideClick = (e) =>
      loginForm &&
      !loginForm.current.contains(e.target) &&
      !document.querySelector(".login-button").contains(e.target) &&
      toggleLogin(true);

    document.addEventListener("mousedown", hideLoginOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", hideLoginOnOutsideClick);
      hideMessage();
    };
  }, [isLoginHidden, toggleLogin, hideMessage]);

  const [loginData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;

  const onChange = (e) => {
    setFormData({ ...loginData, [e.target.name]: e.target.value });
    showMsg && hideMessage();
  };

  const logIn = async (e) => {
    e.preventDefault();
    const isLoggedIn = await login(email, password);
    if (isLoggedIn === true) toggleLogin(true);
  };

  const loginEmail = useRef();
  const loginForm = useRef();
  return (
    <form
      onSubmit={(e) => logIn(e)}
      className={isLoginHidden ? "login-form" : "login-form show"}
      ref={loginForm}
    >
      <input
        type="text"
        placeholder="Email"
        name="email"
        ref={loginEmail}
        onChange={(e) => onChange(e)}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => onChange(e)}
      />
      {showMsg ? (
        <Message />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <button type="submit" className="login-btn">
          Log In
        </button>
      )}
    </form>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.gameData.isLoading,
  showMsg: state.notifications.message.showMsg,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
  setMessage: (newMessage) => dispatch(setMessage(newMessage)),
  hideMessage: () => dispatch(hideMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
