import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Notification from './Notification'

const Notifications = ({ notifications }) => {
    useEffect(() => {

    });

    return ( 
        <div className={ `notifications ${!notifications.length > 1 ? 'hide' : ''}`}>
            {notifications.map((notif, i) => <Notification key={i} notif={notif} />)}
        </div>
    )
}

const mapStateToProps = state => ({
    notifications: state.notifications.notifications
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
