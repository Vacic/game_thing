import React from 'react';
import { connect } from 'react-redux';
import Notification from './Notification'

const Notifications = ({ notifications }) => 
    <div className={ `notifications ${notifications.length === 0 ? 'hide' : ''}`}>
        {notifications.map((notif, i) => <Notification key={i} notif={notif} />)}
    </div>

const mapStateToProps = state => ({
    notifications: state.notifications.notifications
});

export default connect(mapStateToProps)(Notifications);
