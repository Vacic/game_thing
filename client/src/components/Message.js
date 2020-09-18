import React, { useEffect, useState } from 'react';

const Message = ({ msg }) => {
    const [hideMsg, toggleMsg] = useState(false);
    useEffect(() => {
        const msgTimeout = setTimeout(()=>toggleMsg(true), 1500);
        return () => clearTimeout(msgTimeout);
    }, [hideMsg]);
    return (
        <div className={!hideMsg ? msg.class : `${msg.class} hide`}>
            {msg && msg.item && <p>{msg.str} {msg.item.name}</p>}
            {msg && msg.item && <img src={msg.item.img} alt=""/>}
        </div>
    )
}

export default Message;