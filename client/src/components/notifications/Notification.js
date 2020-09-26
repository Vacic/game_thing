import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { removeNotification } from '../../redux';

const Notification = ({ notif: { msg, classType, img }, removeNotification }) => {
    const [isNotifHidden, toggleNotif] = useState(true);
    
    useEffect(() => {
        setTimeout(() => toggleNotif(false), 1);
        const toggleTimeout = setTimeout(() => toggleNotif(true), 2000);
        setTimeout(() => removeNotification(), 3000); // toggleNotif Timeout + Animation Time
        return () => clearTimeout(toggleTimeout);
    }, [removeNotification]);
    
    return (
        <div className={`notification ${classType} ${isNotifHidden ? 'hide' : ''} ${!img ? 'center' : ''}`}>
            {<p className="notification-text">{ msg }</p>}
            {img && <img className="notification-img" src={ img } alt=""/>}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeNotification: id => dispatch(removeNotification(id))
});

export default connect(null, mapDispatchToProps)(Notification);
