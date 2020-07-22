import React from 'react';

export default function AttackSpeed(props) {
    const { attSpd, weapon, playerAttProgressDiv, enemyAttProgressDiv } = props
    return (
        <div className="attack-bar">
            {weapon && <p className="weapon-name">{weapon}</p>}
            <div className="att-empty"></div>
            <div className="att-progress" ref={playerAttProgressDiv ? playerAttProgressDiv : enemyAttProgressDiv}></div>
            <span>Attack Speed: {attSpd}sec</span>
        </div>
    )
}