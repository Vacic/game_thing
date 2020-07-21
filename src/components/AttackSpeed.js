import React from 'react';

export default function AttackSpeed(props) {
    const attSpd = props.attSpd
    return (
        <div className="attack-bar">
            {props.weapon ? <p className="weapon-name">{props.weapon}</p> : ''}
            <div className="att-empty"></div>
            <div className="att-progress" ref={props.playerAttProgressDiv ? props.playerAttProgressDiv : props.enemyAttProgressDiv}></div>
            <span>Attack Speed: {attSpd}sec</span>
        </div>
    )
}