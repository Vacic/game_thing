import React from 'react';

export default function AttackSpeed(props) {
    const attSpd = props.attSpd
    return (
        <div className="attack-bar">
            <div className="att-empty"></div>
            <div className="att-progress"></div>
            <span>Attack Speed: {attSpd}sec</span>
        </div>
    )
}
