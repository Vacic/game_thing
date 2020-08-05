import React from 'react';
import { connect } from 'react-redux';

const Message = ({ notificationMessage, classStr, invEquip, gameContainer, str }) => {
    if(gameContainer) { return (
        <div className={classStr}>
            {notificationMessage.name ? <p>You have recieved {notificationMessage.name}</p> : <p>{str}</p>}
            {notificationMessage.img && <img src={notificationMessage.img} alt=""/>}
        </div>
    )} else if (invEquip) { return (
        <div className={classStr}>
            <p>{notificationMessage.str}</p>
            <img src={notificationMessage.img} alt=""/>
        </div>
    )} else {
        return <div className='msg-success hide'></div>
    }
};



export default (Message);
