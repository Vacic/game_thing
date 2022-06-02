import React, { useEffect } from "react";
import { connect } from "react-redux";
import { hideMessage } from "../../../redux";

const Message = ({ message: { msg, showMsg, classType }, hideMessage }) => {
  useEffect(() => {
    const timeout = setTimeout(() => hideMessage(), 3000);
    return () => clearTimeout(timeout);
  }, [hideMessage]);

  return showMsg && <p className={`msg ${classType}`}>{msg}</p>;
};

const mapStateToProps = (state) => ({
  message: state.notifications.message,
});

const mapDispatchToProps = (dispatch) => ({
  hideMessage: () => dispatch(hideMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
