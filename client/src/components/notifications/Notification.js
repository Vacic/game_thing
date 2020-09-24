import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { removeNotification } from '../../redux';

const Notification = ({ notif: { msg, classType, img }, removeNotification }) => {
    const [isNotifHidden, toggleNotif] = useState(false);
    const removeNotifTimeout = useRef();
    useEffect(() => {
        const hideTimeout = setTimeout(() => {
            toggleNotif(true);
            removeNotifTimeout.current = setTimeout(() => removeNotification(), 2000); // Higher delay in order to prevent getting an empty array in redux state so often
        } ,1500);
        return () => {
            clearTimeout(hideTimeout);
            clearTimeout(removeNotifTimeout.current)
        }
    }, [removeNotification]);
    
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
