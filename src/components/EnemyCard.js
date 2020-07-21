import React from 'react';
import HpBar from './HpBar';

export default function EnemyCard(props) {
    const {currentEnemyHp, maxHp, name, loadingEnemy} = props;
    
    return (
        <div className="enemy-card">
            <p className="name">{name}</p>
            <HpBar currentHp={currentEnemyHp} maxHp={maxHp} enemyHpBar={props.enemyHpBar} />
            {loadingEnemy ? <img src="https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg" alt=""/> : <img src="https://via.placeholder.com/150" alt=""/>}
        </div>
    )
}