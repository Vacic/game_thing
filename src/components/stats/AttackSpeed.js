import React from 'react';

export default function AttackSpeed({ attSpd, weapon, playerAttProgressDiv, enemyAttProgressDiv }) {
    return (
        <div className="attack-bar">
            {weapon ? <p className="weapon-name">{weapon}</p> : <p className="no-weapon">no-weapon</p>}
            <div className="att-empty"></div>
            <div className="att-progress" ref={playerAttProgressDiv ? playerAttProgressDiv : enemyAttProgressDiv}></div>
            <span>Attack Speed: {attSpd}sec</span>
        </div>
    )
}