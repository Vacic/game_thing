import React, { Component } from 'react';
import EnemyCard from './EnemyCard';
import Stats from './Stats';
import AttackSpeed from './AttackSpeed';

export default class Enemy extends Component {    
    render() {
        const {name, hp, dmg, attSpd, def, eva} = this.props.enemy;
        const currentEnemyHp = this.props.currentEnemyHp;
        return (
            <div className="enemy">
                <EnemyCard currentEnemyHp={currentEnemyHp} maxHp={hp} name={name} />
                <AttackSpeed attSpd={attSpd} />
                <Stats dmg={dmg} def={def} eva={eva} />
            </div>
        )
    }
}
