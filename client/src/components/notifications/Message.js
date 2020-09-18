import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../redux';

const Message = ({ message }) => (
    message.showMsg && <p className={message.showMsg ? message.classType === "success" ? "msg success show" : "msg danger show" : "msg"}>{message.msg}</p>
);

const mapStateToProps = state => ({
    message: state.notifications.message
});

const mapDispatchToProps = dispatch => ({
    setMessage: newMessage => dispatch(setMessage(newMessage))
})

export default connect(mapStateToProps, mapDispatchToProps)(Message);