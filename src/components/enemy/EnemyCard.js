import React from 'react';
import HpBar from '../stats/HpBar';
import loadingImg from '../../img/loading.png';

export default function EnemyCard({ currentEnemyHp, maxHp, name, loadingEnemy, enemyHpBar, enemyAttStatus }) {
    return (
        <div className="enemy-card">
            <p className="name">{name}</p>
            <HpBar currentHp={currentEnemyHp} maxHp={maxHp} enemyHpBar={enemyHpBar} enemyAttStatus={enemyAttStatus} />
            {loadingEnemy 
                ? <div className="loading-img"><img src={loadingImg} alt=""/></div>
                : <img className="enemy-img" src="https://via.placeholder.com/150" alt=""/>
            }
        </div>
    )
}