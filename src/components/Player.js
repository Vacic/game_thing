import React, { Component } from 'react'
import PlayerCard from './PlayerCard';
import Stats from './Stats';
import AttackSpeed from './AttackSpeed';

export default class Player extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             hp: 100,
             dmg: 10,
             attSpd: 1,
             def: 10,
             eva: 10
        }
    }
    
    render() {
        const {hp, dmg, attSpd, def, eva} = this.state;
        return (
            <div className="player">
                <PlayerCard hp={hp}/>
                <AttackSpeed attSpd={attSpd} />
                <Stats dmg={dmg} def={def} eva={eva} />
            </div>
        )
    }
}
