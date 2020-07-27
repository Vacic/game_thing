import React, { Component } from 'react';
import { connect } from 'react-redux';
import BattleScreen from './BattleScreen';
import Equipment from './equipment/Equipment';
import Inventory from './inventory/Inventory';
import LocationSelection from './location/LocationSelection';
import { setCurrentPlayerHp, setCurrentEnemyHp, setCurrentEnemyStats, setLoading, enemyTakesDamage, playerTakesDamage } from '../redux';


class GameContainer extends Component {
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~GAME LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~  
        initCombat = (location) => {
            if(!this.props.loadingEnemy) {
                this.resetActions();
                this.props.setLoading(true);
                setTimeout(() => {
                    this.props.setLoading(false); // Makes it so the code can't be run untill the timeout fires off
                    this.enemyHpBar.style.width = '100%'; // Whenever a new enemy is called the hp is reset to 100%
                    this.getEnemy(location);
                    
                    this.startPlayerAttack(this.props.player.dmg, this.props.player.attSpd, location)
                    this.startEnemyAttack(this.props.currentEnemy.dmg, this.props.currentEnemy.attSpd, location)
                }, this.props.globalTimeout);
            } else {
                console.log('Please wait for an enemy to load');
            }
        }
        
        // Gets a random enemy from the selected location
        getEnemy = (location) => {
            const enemies = Object.keys(this.props.locationEnemies[location]); // Makes an array out of the keys
            const randEnemy = Math.floor(Math.random() * Math.floor(enemies.length)); // Randomizes the enemy
            const enemyStats = this.props.locationEnemies[location][enemies[randEnemy]]; // Get stats form the random enemy

            this.props.setCurrentEnemyStats(enemyStats);
            this.props.setCurrentEnemyHp(enemyStats.hp);
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
        startPlayerAttack = (damage, attSpd, location) => {
            this.playerAttProgressDiv.style.animation = `attBar ${attSpd}s linear infinite`;
            this.playerAttInterval = setInterval(() => {  // Assigning it to a variable so i can stop the interval in 'resetActions'
                this.enemyTakesDamage(damage);
                if (this.props.currentEnemyHp <= 0) this.handleEnemyDeath(location);
            }, attSpd * 1000);
        }
    
        handlePlayerDeath = () => {
            this.playerDiv.classList.add('dead');
            this.resetActions();
            
            setTimeout(() => {
                this.props.setCurrentPlayerHp(this.props.player.hp);
                this.props.setCurrentEnemyHp(0);
                this.props.setCurrentEnemyStats({ name: 'Select Location', hp:0, dmg:0, attSpd:0, def:0, eva:0 });

                this.playerHpBar.style.width = '100%';
                this.enemyHpBar.style.width = '100%';
                this.playerDiv.classList.remove('dead');
            }, this.props.globalTimeout);
        }
    
        playerTakesDamage = (damage) => {
            this.props.playerTakesDmg(damage)
            this.playerHpBar.style.width = `${Math.floor((this.props.currentPlayerHp/this.props.player.hp)*100)}%`
        }
        
    
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ENEMY LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
        startEnemyAttack = (damage, attSpd) => {
            this.enemyAttProgressDiv.style.animation = `attBar ${attSpd}s linear infinite`;
            this.enemyAttInterval = setInterval(() => {  // Assigning it to a variable so i can stop the interval in resetActions
                this.playerTakesDamage(damage);
                if (this.props.currentPlayerHp <= 0) this.handlePlayerDeath();
            }, attSpd * 1000);
        }
    
        handleEnemyDeath = (location) => {
            this.enemyDiv.classList.add('dead');
            this.initCombat(location);
    
            setTimeout(() => {
                this.enemyDiv.classList.remove('dead');
            }, this.props.globalTimeout);
        }
        
        enemyTakesDamage = (damage) => {
            this.props.enemyTakesDmg(damage)
            this.enemyHpBar.style.width = `${Math.floor((this.props.currentEnemyHp/this.props.currentEnemy.hp)*100)}%`
        }

    render() {
        return (
            <div className="container">
                <LocationSelection 
                    initCombat={this.initCombat} 
                />
                
                <BattleScreen 
                    playerHpBar={el => this.playerHpBar = el}
                    playerDiv={el => this.playerDiv = el}
                    playerAttProgressDiv={el => this.playerAttProgressDiv = el}

                    enemyHpBar={el => this.enemyHpBar = el}
                    enemyDiv={el => this.enemyDiv = el}
                    enemyAttProgressDiv={el => this.enemyAttProgressDiv = el}
                />

                <Equipment />

                <Inventory />
            </div>
        )
    }
}

const mapStateToProps = state => {
	return {
        locationEnemies: state.locationEnemies,
        player: state.player,
        currentEnemyHp: state.gameData.currentEnemyHp,
        currentPlayerHp: state.gameData.currentPlayerHp,
        globalTimeout: state.gameData.globalTimeout,
        loadingEnemy: state.gameData.loadingEnemy,
        currentEnemy: state.gameData.currentEnemy
	}
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentEnemyHp: currentEnemyHp => dispatch(setCurrentEnemyHp(currentEnemyHp)),
        setCurrentEnemyStats: currentEnemy => dispatch(setCurrentEnemyStats(currentEnemy)),
        setLoading: (isLoading) => dispatch(setLoading(isLoading)),
        setCurrentPlayerHp: currentPlayerHp => dispatch(setCurrentPlayerHp(currentPlayerHp)),
        enemyTakesDmg: damage => dispatch(enemyTakesDamage(damage)),
        playerTakesDmg: damage => dispatch(playerTakesDamage(damage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
