import React from 'react';
import HpBar from './HpBar';

export default function EnemyCard(props) {
    const {currentEnemyHp, maxHp, name} = props;
    
    return (
        <div className="enemy-card">
            <p className="name">{name}</p>
            <HpBar currentHp={currentEnemyHp} maxHp={maxHp} />
            <img src="https://via.placeholder.com/150" alt=""/>
        </div>
    )
}
