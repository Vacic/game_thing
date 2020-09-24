import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { removeNotification } from '../../redux';

const Notification = ({ notif: { msg, classType, img }, removeNotification }) => {
    const [isNotifHidden, toggleNotif] = useState(false);
    useEffect(() => {
        const hideTimeout = setTimeout(() => toggleNotif(true), 1500);
        const removeNotifTimeout = setTimeout(() => removeNotification(), 2000); // Hide Timeout + Animation Time
        return () => {
            clearTimeout(hideTimeout);
            clearTimeout(removeNotifTimeout);
        }
    });
    
    return (
        <div className={`notification ${classType} ${isNotifHidden ? 'hide' : ''} ${!img ? 'center' : ''}`}>
            {<p className="notification-text">{ msg }</p>}
            {img && <img className="notification-img" src={ img } alt=""/>}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeNotification: () => dispatch(removeNotification())
});

export default connect(null, mapDispatchToProps)(Notification);
