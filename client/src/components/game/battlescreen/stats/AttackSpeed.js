import React from 'react';

const AttackSpeed = ({ attSpd, weapon, playerAttProgressDiv, enemyAttProgressDiv }) =>
    <div className="attack-bar">
        {weapon ? <p className="weapon-name">{weapon}</p> : <p className="no-weapon">no-weapon</p>}
        <div className="att-empty"></div>
        <div className="att-progress" ref={playerAttProgressDiv ? playerAttProgressDiv : enemyAttProgressDiv}></div>
        <p>Attack Speed: {attSpd}s</p>
    </div>

export default AttackSpeed;