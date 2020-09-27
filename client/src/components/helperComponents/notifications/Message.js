import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { hideMessage } from '../../../redux';

const Message = ({ message, hideMessage }) => {
    useEffect(() => {
        const timeout = setTimeout(() => hideMessage(), 3000);
        return () => clearTimeout(timeout);
    }, [hideMessage]);

    return message.showMsg && <p className={message.showMsg ? message.classType === "success" ? "msg success show" : "msg danger show" : "msg"}>{message.msg}</p>
};

const mapStateToProps = state => ({
    message: state.notifications.message
});

const mapDispatchToProps = dispatch => ({
    hideMessage: () => dispatch(hideMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);