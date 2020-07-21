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
        dmg: 23,
        attSpd: 1.5,
        def: 10,
        eva: 10
      },

      currentPlayerHp: 100,  // current hp required for the ui

      currentEnemyHp: 0,  // current hp required for the ui

      currentEnemy: {  // Stores the stats of the enemy that the player is currently fighting
        name: 'Select Location',
        hp: 0,
        dmg: 0,
        attSpd: 0,
        def: 0,
        eva: 0
      },

      getEnemyTimeout: false, // required because getEnemy triggers twice since it's running in the render method
    }
  }

  // Initiates Combat
  initCombat = (location) => {
    this.getEnemy(location);
    this.startAttack(this.state.player.dmg, this.state.player.attSpd, location)
  }

  // Gets a random enemy from the selected location and sets 
  getEnemy = (location) => {
    this.enemyHpBar.style.width = '100%'; // Whenever a new enemy is called the hp is reset to 100%
    clearInterval(this.attInterval);

    const enemies = Object.keys(this.state.location_enemies[location]); // Makes an array out of the keys
    const randEnemy = Math.floor(Math.random() * Math.floor(enemies.length)); // Randomizes the enemy
    const enemyStats = this.state.location_enemies[location][enemies[randEnemy]];

    this.setState({ currentEnemy: enemyStats, currentEnemyHp: enemyStats.hp });
  }

  // Starts player attack, maybe can be used for enemy attack as well?
  startAttack = (attack, attSpd, location) => {
      this.attProgress.style.animation = `attBar ${attSpd}s linear infinite`;
      this.attInterval = setInterval(() => {  // Assigning it to a variable so i can stop the interval in 'handleEnemyDeath'
        this.enemyTakesDmg(attack);
        if (this.state.currentEnemyHp <= 0) this.handleEnemyDeath(attSpd, location);
      }, attSpd * 1000);
  }

  // Handles everything that happenes after an enemy dies
  handleEnemyDeath = (attSpd, location) => {
    this.attProgress.style.animation = 'pause';
    if (!this.state.getEnemyTimeout) {
      this.setState({ getEnemyTimeout: true });
      this.enemyDiv.classList.add('dead');
       // Clears the attack interval - prevents the attack animation and damage animation from going out of sync
      setTimeout(() => {
        this.initCombat(location);
        this.attProgress.style.animation = `attBar ${attSpd}s linear infinite`;
        this.setState({ getEnemyTimeout: false });
        this.enemyDiv.classList.remove('dead')
      }, 1000);
    }
  }

  // Handles enemy taking damage, here to make the code look cleaner

  enemyTakesDmg = (attack) => {
    this.setState(prevState => {
      return {
        currentEnemyHp: (prevState.currentEnemyHp - attack) < 0 ? 0 : prevState.currentEnemyHp - attack
      }
    });
    this.enemyHpBar.style.width = `${Math.floor((this.state.currentEnemyHp/this.state.currentEnemy.hp)*100)}%`
  }

  render() {
    const { location_enemies, player, currentPlayerHp, currentEnemyHp, currentEnemy } = this.state;
  return (
      <div className="App">
        <div className="container">
          <LocationSelection 
            locations={location_enemies} 
            initCombat={this.initCombat} 
          />
          
          <BattleScreen 
            player={player} 
            currentPlayerHp={currentPlayerHp} 
            enemy={currentEnemy} 
            currentEnemyHp={currentEnemyHp} 
            attProgress={el => this.attProgress = el}
            enemyHpBar={el => this.enemyHpBar = el}
            enemyDiv={el => this.enemyDiv = el}
          />

          <Equipment />

          <Inventory />
        </div>
      </div>
    );
  }
}

export default App;