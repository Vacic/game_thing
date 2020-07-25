import React, { Component } from 'react';
import './css/main.css';
import BattleScreen from './components/BattleScreen';
import Equipment from './components/equipment/Equipment';
import Inventory from './components/inventory/Inventory';
import LocationSelection from './components/location/LocationSelection';

class App extends Component {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~GAME LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~  
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
	// Resets animations and attack intervals
	resetActions = () => {
		this.playerAttProgressDiv.style.animation = 'none';
		this.enemyAttProgressDiv.style.animation = 'none';
		this.resetFlow = this.enemyAttProgressDiv.offsetHeight;  // resets the flow of the animations
		clearInterval(this.playerAttInterval);
		clearInterval(this.enemyAttInterval);
	}
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~PLAYER LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	startPlayerAttack = (attack, attSpd, location) => {
			this.playerAttProgressDiv.style.animation = `attBar ${attSpd}s linear infinite`;
			this.playerAttInterval = setInterval(() => {  // Assigning it to a variable so i can stop the interval in 'resetActions'
			this.enemyTakesDmg(attack);
			if (this.state.currentEnemyHp <= 0) this.handleEnemyDeath(location);
		}, attSpd * 1000);
	}

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

	playerTakesDmg = (attack) => {
		this.setState(prevState => {
			return { currentPlayerHp: (prevState.currentPlayerHp - attack) <= 0 ? 0 : prevState.currentPlayerHp - attack }
		});
		this.playerHpBar.style.width = `${Math.floor((this.state.currentPlayerHp/this.state.player.hp)*100)}%`
	}
	

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ENEMY LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	startEnemyAttack = (attack, attSpd, location) => {
		this.enemyAttProgressDiv.style.animation = `attBar ${attSpd}s linear infinite`;
		this.enemyAttInterval = setInterval(() => {  // Assigning it to a variable so i can stop the interval in resetActions
			this.playerTakesDmg(attack);
			if (this.state.currentPlayerHp <= 0) this.handlePlayerDeath();
		}, attSpd * 1000);
	}

	handleEnemyDeath = (location) => {
		this.enemyDiv.classList.add('dead');
		this.initCombat(location);

		setTimeout(() => {
			this.enemyDiv.classList.remove('dead');
		}, this.state.globalTimeout);
	}
	
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