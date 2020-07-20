import React, { Component } from 'react';
import './css/main.css';
import BattleScreen from './components/BattleScreen';
import Equipment from './components/Equipment';
import Inventory from './components/Inventory';
import LocationSelection from './components/LocationSelection';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      location_enemies: {
        farm: {
          cow: {
              name: 'Cow',
              hp: 30,
              dmg: 5,
              attSpd: 2.2,
              def: 10,
              eva: 2
          },
          chicken: {
              name: 'Chicken',
              hp: 20,
              dmg: 3,
              attSpd: 3,
              def: 1,
              eva: 1
          },
          farmer: {
              name: 'Farmer',
              hp: 50,
              dmg: 8,
              attSpd: 2,
              def: 3,
              eva: 3
          }
        },
        bandit_camp: {
          bandit: {
              name: 'Bandit',
              hp: 70,
              dmg: 10,
              attSpd: 2.1,
              def: 5,
              eva: 5
          },
          bandit_leader: {
            name: 'Bandit Leader',
            hp: 150,
            dmg: 15,
            attSpd: 1.8,
            def: 8,
            eva: 10
          },
          bandit_archer: {
            name: 'Bandit Archer',
              hp: 40,
              dmg: 25,
              attSpd: 1.5,
              def: 3,
              eva: 3
          },
          bandit_swordsman: {
            name: 'Bandit Swordsman',
              hp: 100,
              dmg: 12,
              attSpd: 2.5,
              def: 7,
              eva: 7
          }
        },
        dungeon: {
          basilisk: {
            name: 'Basilisk',
              hp: 200,
              dmg: 25,
              attSpd: 1.8,
              def: 15,
              eva: 25
          },
          harpy: {
            name: 'Harpy',
              hp: 200,
              dmg: 32,
              attSpd: 1,
              def: 9,
              eva: 35
          },
          minotaur: {
            name: 'Minotaur',
              hp: 500,
              dmg: 60,
              attSpd: 2,
              def: 30,
              eva: 15
          }
        }
      },

      player: {
        hp: 100,
        dmg: 10,
        attSpd: 1,
        def: 10,
        eva: 10
      },

      currentPlayerHp: 100,

      currentEnemyHp: 0,

      currentEnemy: {
        name: 'Select Location',
        hp: 0,
        dmg: 0,
        attSpd: 0,
        def: 0,
        eva: 0
      }
    }
  }

  // Initiates Combat

  initCombat = (location) => {
    this.getEnemy(location);
    setInterval(()=>this.startAttack(10, 1), 1000)
  }

  // Gets a random enemy from the selected location and sets 

  getEnemy = (location) => {
    const enemies = Object.keys(this.state.location_enemies[location]);
    const randEnemy = Math.floor(Math.random() * Math.floor(enemies.length));
    const enemyStats = this.state.location_enemies[location][enemies[randEnemy]];
    
    this.setState({ currentEnemy: enemyStats, currentEnemyHp: enemyStats.hp });
  }

  // Starts player attack, maybe can be used for enemy attack as well?

  startAttack = (attack, attSpd) => {
    const attbarthing = document.querySelector('.att-progress');

      attbarthing.classList.add('att-start');
      
    
    //attbarthing.style.transition = `width ${attSpd}s linear`

    this.setState(prevState => {
      return {
        currentEnemyHp: prevState.currentEnemyHp - attack
      }
    });
  }

  render() {
    const { location_enemies, player, currentPlayerHp, currentEnemyHp, currentEnemy } = this.state;
  return (
      <div className="App">
        <div className="container">
          <LocationSelection locations={location_enemies} initCombat={this.initCombat} />
          <BattleScreen player={player} currentPlayerHp={currentPlayerHp} enemy={currentEnemy} currentEnemyHp={currentEnemyHp} />
          <Equipment />
          <Inventory />
        </div>
      </div>
    );
  }
}

export default App;