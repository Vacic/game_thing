import React, { Component } from 'react';
import './css/main.css';
import BattleScreen from './components/BattleScreen';
import Equipment from './components/equipment/Equipment';
import Inventory from './components/inventory/Inventory';
import LocationSelection from './components/location/LocationSelection';

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
						dmg: 20,
						attSpd: 1.8,
						def: 8,
						eva: 10
					},
					bandit_archer: {
						name: 'Bandit Archer',
						hp: 50,
						dmg: 25,
						attSpd: 1.5,
						def: 3,
						eva: 3
					},
					bandit_swordsman: {
						name: 'Bandit Swordsman',
						hp: 100,
						dmg: 18,
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
				weapon: 'Fists',
				hp: 100,
				dmg: 10,
				attSpd: 1,
				def: 10,
				eva: 10
			},

			globalTimeout: 1000,  // Needs to be the same so things don't get desynced and weird

			currentPlayerHp: 100,  // Current hp required for the ui and HP bar calculation

			currentEnemyHp: 0,  // Current hp required for the ui and HP bar calculation

			currentEnemy: {  // Stores the stats of the enemy that the player is currently fighting
				name: 'Select Location',
				hp: 0,
				dmg: 0,
				attSpd: 0,
				def: 0,
				eva: 0
			},

			loadingEnemy: false  // Controls whether the loading screen instead of enemy picture shows up & makes the user unable to spam click locations which otherwise breaks the game
		}
	}
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~GAME LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~  

	// Initiates Combat
	initCombat = (location) => {
		if(!this.state.loadingEnemy) {
			this.resetActions();
			this.setState({ loadingEnemy: true });
			setTimeout(() => {
				this.setState({ loadingEnemy: false }); // Makes it so the code can't be run untill the timeout fires off
				this.enemyHpBar.style.width = '100%'; // Whenever a new enemy is called the hp is reset to 100%
				this.getEnemy(location);
				
				this.startPlayerAttack(this.state.player.dmg, this.state.player.attSpd, location)
				this.startEnemyAttack(this.state.currentEnemy.dmg, this.state.currentEnemy.attSpd, location)
			}, this.state.globalTimeout);
		} else {
			console.log('Please wait for an enemy to load');
		}
	}
	
	// Gets a random enemy from the selected location
	getEnemy = (location) => {
		const enemies = Object.keys(this.state.location_enemies[location]); // Makes an array out of the keys
		const randEnemy = Math.floor(Math.random() * Math.floor(enemies.length)); // Randomizes the enemy
		const enemyStats = this.state.location_enemies[location][enemies[randEnemy]]; // Get stats form the random enemy
		
		this.setState({ currentEnemy: enemyStats, currentEnemyHp: enemyStats.hp }); // Assing stats to the current enemy
	}
	
	resetActions = () => {
		this.playerAttProgressDiv.style.animation = 'none';
		this.enemyAttProgressDiv.style.animation = 'none';
		this.resetFlow = this.enemyAttProgressDiv.offsetHeight;  // resets the flow of the animations
		clearInterval(this.playerAttInterval);
		clearInterval(this.enemyAttInterval);
	}
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~PLAYER LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	// Starts player attack
	startPlayerAttack = (attack, attSpd, location) => {
			this.playerAttProgressDiv.style.animation = `attBar ${attSpd}s linear infinite`;
			this.playerAttInterval = setInterval(() => {  // Assigning it to a variable so i can stop the interval in 'resetActions'
			this.enemyTakesDmg(attack);
			if (this.state.currentEnemyHp <= 0) this.handleEnemyDeath(location);
		}, attSpd * 1000);
	}

	// Handles everything that happenes after the player dies
	handlePlayerDeath = () => {
		this.playerDiv.classList.add('dead');
		this.resetActions();
		
		setTimeout(() => {
			this.setState({ currentPlayerHp: this.state.player.hp, currentEnemyHp: 0, currentEnemy: {name: 'Select Location', hp:0, dmg:0, attSpd:0, def:0, eva:0} });
			this.playerHpBar.style.width = '100%';
			this.enemyHpBar.style.width = '100%';
			this.playerDiv.classList.remove('dead');
		}, this.state.globalTimeout);
	}
	
	// Handles enemy taking damage, here to make the code look cleaner
	playerTakesDmg = (attack) => {
		this.setState(prevState => {
			return { currentPlayerHp: (prevState.currentPlayerHp - attack) <= 0 ? 0 : prevState.currentPlayerHp - attack }
		});
		this.playerHpBar.style.width = `${Math.floor((this.state.currentPlayerHp/this.state.player.hp)*100)}%`
	}
	

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ENEMY LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	// Starts enemy attack
	startEnemyAttack = (attack, attSpd, location) => {
		this.enemyAttProgressDiv.style.animation = `attBar ${attSpd}s linear infinite`;
		this.enemyAttInterval = setInterval(() => {  // Assigning it to a variable so i can stop the interval in resetActions
			this.playerTakesDmg(attack);
			if (this.state.currentPlayerHp <= 0) this.handlePlayerDeath();
		}, attSpd * 1000);
	}

	// Handles everything that happenes after an enemy dies
	handleEnemyDeath = (location) => {
		this.enemyDiv.classList.add('dead');
		this.initCombat(location);

		setTimeout(() => {
			this.enemyDiv.classList.remove('dead');
		}, this.state.globalTimeout);
	}

	// Handles enemy taking damage, here to make the code look cleaner
	enemyTakesDmg = (attack) => {
		this.setState(prevState => {
			return { currentEnemyHp: (prevState.currentEnemyHp - attack) <= 0 ? 0 : prevState.currentEnemyHp - attack }
		});
		this.enemyHpBar.style.width = `${Math.floor((this.state.currentEnemyHp/this.state.currentEnemy.hp)*100)}%`
	}


	render() {
		const { location_enemies, player, currentPlayerHp, currentEnemyHp, currentEnemy, loadingEnemy } = this.state;
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
						playerHpBar={el => this.playerHpBar = el}
						playerDiv={el => this.playerDiv = el}
						playerAttProgressDiv={el => this.playerAttProgressDiv = el}

						enemy={currentEnemy} 
						currentEnemyHp={currentEnemyHp} 
						enemyHpBar={el => this.enemyHpBar = el}
						enemyDiv={el => this.enemyDiv = el}
						enemyAttProgressDiv={el => this.enemyAttProgressDiv = el}
						loadingEnemy={loadingEnemy}
					/>

					<Equipment />

					<Inventory />
				</div>
			</div>
		);
	}
}

export default App;