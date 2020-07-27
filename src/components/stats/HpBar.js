import React from 'react'

export default function HpBar({ currentHp, maxHp, enemyHpBar, playerHpBar }) {
    return (
        <div className="bar hp-bar">
            <div className="current" ref={enemyHpBar ? enemyHpBar : playerHpBar}></div>
            <div className="max"></div>
            <p className="hp">{currentHp}/{maxHp}</p>
        </div>
    )
}