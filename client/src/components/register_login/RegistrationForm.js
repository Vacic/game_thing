import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../../services";
import { hideMessage, setMessage } from "../../redux";
import Message from "../helperComponents/notifications/Message";

const RegistrationForm = React.memo(({ setMessage, hideMessage, showMsg }) => {
  const [registerFormData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [regLoading, toggleRegLoading] = useState(false);

  useEffect(() => () => hideMessage(), [hideMessage]);

  const { username, email, password, confirmPassword } = registerFormData;

  const onChange = (e) => {
    setFormData({ ...registerFormData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      toggleRegLoading(true);
      const isRegistered = await register({ username, email, password });
      if (isRegistered === true) setTimeout(() => history.push("/"), 2000);
      else toggleRegLoading(false);
    } else {
      setMessage({ msg: "Passwords Don't Match", classType: "danger" });
      toggleRegLoading(false);
    }
  };
  const history = useHistory();
  return (
    <div className="registration-container">
      <div className="registration-form">
        {showMsg && <Message />}
        <form onSubmit={(e) => submit(e)}>
          <h2 className="center">Create an Account</h2>
          <Link to="/">
            <i className="fas fa-2x fa-home" />
          </Link>
          <div className="form-spacing">
            <label className="label-control" htmlFor="username">
              Username
            </label>
            <input
              className="input-control"
              type="text"
              name="username"
              onChange={(e) => onChange(e)}
            />
            <small>*Must contain at least 2 characters</small>
          </div>
          <div className="form-spacing">
            <label className="label-control" htmlFor="email">
              Email
            </label>
            <input
              className="input-control"
              type="email"
              name="email"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-spacing">
            <label className="label-control" htmlFor="password">
              Password
            </label>
            <input
              className="input-control"
              type="password"
              name="password"
              onChange={(e) => onChange(e)}
            />
            <small>
              *Must contain at least one letter, number and a special character
            </small>
          </div>
          <div className="form-spacing">
            <label className="label-control" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="input-control"
              type="password"
              name="confirmPassword"
              onChange={(e) => onChange(e)}
            />
          </div>
          <p>
            <Link to="/login">Already have an account?</Link>
          </p>
          <div className="button">
            <button
              type="submit"
              className="btn neutral center"
              disabled={regLoading ? true : false}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => ({
  showMsg: state.notifications.message.showMsg,
});

const mapDispatchToProps = (dispatch) => ({
  setMessage: (newMessage) => dispatch(setMessage(newMessage)),
  hideMessage: () => dispatch(hideMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
