import React from 'react'

export default function HpBar({ currentHp, maxHp, enemyHpBar, playerHpBar, enemyAttStatus, playerAttStatus }) {
    return (
        <div className="hp-bar">
            <div className="current" ref={enemyHpBar ? enemyHpBar : playerHpBar}></div>
            <div className="max"></div>
            <p className={enemyHpBar ? "enemy-att-status" : "player-att-status"} ref={enemyAttStatus ? enemyAttStatus : playerAttStatus}>miss</p>
            <p className="hp">{currentHp}/{maxHp}</p>
        </div>
    )
}