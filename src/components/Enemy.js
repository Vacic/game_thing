import React, { Component } from 'react';
import EnemyCard from './EnemyCard';
import Stats from './Stats';
import AttackSpeed from './AttackSpeed';

export default class Enemy extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             hp: 70,
             dmg: 10,
             attSpd: 2.1,
             def: 5,
             eva: 5,
        }
    }
    
    render() {
        const {name, hp, dmg, attSpd, def, eva} = this.props.enemy;
        return (
            <div className="enemy">
                <EnemyCard hp={hp} name={name} />
                <AttackSpeed attSpd={attSpd} />
                <Stats dmg={dmg} attSpd={attSpd} def={def} eva={eva} />
            </div>
        )
    }
}
