import React from 'react';
import HpBar from '../stats/HpBar';
import loadingImg from '../../img/loading.png';

export default function EnemyCard({ currentEnemyHp, maxHp, name, loadingEnemy, enemyHpBar }) {
    return (
        <div className="enemy-card">
            <p className="name">{name}</p>
            <HpBar currentHp={currentEnemyHp} maxHp={maxHp} enemyHpBar={enemyHpBar} />
            {loadingEnemy 
                ? <img className="loading-img" src={loadingImg} alt=""/> 
                : <img className="enemy-img" src="https://via.placeholder.com/150" alt=""/>
            }
        </div>
    )
}