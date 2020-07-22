import React, { Component } from 'react'

export default class HpBar extends Component {
    render() {
        const { currentHp, maxHp, enemyHpBar, playerHpBar } = this.props;
        return (
            // should take hp from props
            <div className="bar hp-bar">
                <div className="current" ref={enemyHpBar ? enemyHpBar : playerHpBar}></div>
                <div className="max"></div>
                <p className="hp">{currentHp}/{maxHp}</p>
            </div>
        )
    }
}
