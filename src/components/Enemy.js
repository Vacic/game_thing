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

             enemies: {
                farm: {
                    cow: {
                        hp: 30,
                        dmg: 5,
                        attSpd: 2.2,
                        def: 10,
                        eva: 2
                    },
                    chicken: {
                        hp: 20,
                        dmg: 3,
                        attSpd: 3,
                        def: 1,
                        eva: 1
                    },
                    farmer: {
                        hp: 50,
                        dmg: 8,
                        attSpd: 2,
                        def: 3,
                        eva: 3
                    }
                },
                bandit_camp: {
                    bandit: {
                        hp: 70,
                        dmg: 10,
                        attSpd: 2.1,
                        def: 5,
                        eva: 5
                    },
                    bandit_leader: {
                        hp: 150,
                        dmg: 15,
                        attSpd: 1.8,
                        def: 8,
                        eva: 10
                    },
                    bandit_archer: {
                        hp: 40,
                        dmg: 25,
                        attSpd: 1.5,
                        def: 3,
                        eva: 3
                    },
                    bandit_swordsman: {
                        hp: 100,
                        dmg: 12,
                        attSpd: 2.5,
                        def: 7,
                        eva: 7
                    }
                },
                dungeon: {
                    basilisk: {
                        hp: 200,
                        dmg: 25,
                        attSpd: 1.8,
                        def: 15,
                        eva: 25
                    },
                    harpy: {
                        hp: 200,
                        dmg: 32,
                        attSpd: 1,
                        def: 9,
                        eva: 35
                    },
                    minotaur: {
                        hp: 500,
                        dmg: 60,
                        attSpd: 2,
                        def: 30,
                        eva: 15
                    }
                }
             }
        }
    }
    
    render() {
        const {hp, dmg, attSpd, def, eva} = this.state;
        return (
            <div className="enemy">
                <EnemyCard hp={hp} name={Object.keys(this.state.enemies.bandit_camp)[0]} />
                <AttackSpeed attSpd={attSpd} />
                <Stats dmg={dmg} attSpd={attSpd} def={def} eva={eva} />
            </div>
        )
    }
}
