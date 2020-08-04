import React, { Component } from 'react';
import { connect } from 'react-redux';
import BattleScreen from './BattleScreen';
import LocationSelection from './location/LocationSelection';
import { setCurrentPlayerHp, setCurrentEnemyHp, setCurrentEnemyStats, setLoading, enemyTakesDamage, playerTakesDamage, updateItemCount } from '../redux';
import InvAndEquip from './InvAndEquip';


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
                    
                    this.startPlayerAttack(this.props.playerStats.dmg, this.props.playerStats.attSpd, this.props.currentEnemy.def, this.props.currentEnemy.eva, location)
                    this.startEnemyAttack(this.props.currentEnemy.dmg, this.props.currentEnemy.attSpd, this.props.playerStats.def, this.props.playerStats.eva)
                }, this.props.globalTimeout);
            } else {
                console.log('Please wait for an enemy to load');
            }
        }
        
        getEnemy = (location) => {
            const enemies = Object.keys(this.props.locationEnemies[location]); // Makes an array out of the keys
            const randEnemy = Math.floor(Math.random() * (enemies.length - 1) + 1); // Randomizes the enemy
            const enemyStats = this.props.locationEnemies[location][enemies[randEnemy]]; // Get stats form the random enemy


            this.props.setCurrentEnemyStats(enemyStats);
            this.props.setCurrentEnemyHp(enemyStats.hp);
        }
        // Resets animations and attack intervals
        resetActions = () => {
            this.playerAttProgressDiv.style.animation = 'none';
            this.enemyAttProgressDiv.style.animation = 'none';
            this.playerAttStatus.classList.remove('dmg');
            this.enemyAttStatus.classList.remove('dmg');
            this.playerAttStatus.classList.remove('miss');
            this.enemyAttStatus.classList.remove('miss');
            this.resetFlow = this.enemyAttProgressDiv.offsetHeight;  // resets the flow of the animations
            clearInterval(this.playerAttInterval);
            clearInterval(this.enemyAttInterval);
        }

        shouldAttHit = (eva) => {
            return Math.floor(Math.random() * 100) <= eva ? false : true;
        }

        calcDmg = (dmg) => {
            const randDmg = Math.random() * (dmg - Math.ceil(dmg/2)) + Math.ceil(dmg/2);
            return Math.ceil(randDmg);
        }

        calcDef = (dmg, def) => {
            return def <= 10 ? def <= 8 ? Math.floor(dmg - (def / 8)) : Math.ceil(dmg - (def / 8)) :  Math.floor(dmg - ((dmg * (def / 5)) / 100));
        }
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~PLAYER LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        startPlayerAttack = (dmg, attSpd, enemyDef, enemyEva, location = null) => {
            this.playerAttProgressDiv.style.animation = `attBar ${attSpd}s linear infinite`;
            this.playerAttInterval = setInterval(() => {  // Assigning it to a variable so i can stop the interval in 'resetActions'
                this.enemyTakesDamage(dmg, enemyDef, enemyEva);
                if (this.props.currentEnemyHp <= 0) this.handleEnemyDeath(location);
            }, attSpd * 1000);
        }
    
        handlePlayerDeath = () => {
            this.playerDiv.classList.add('dead');
            this.resetActions();
            
            setTimeout(() => {
                this.props.setCurrentPlayerHp(this.props.playerStats.hp <= 120 ? Math.floor(this.props.playerStats.hp / 2) : Math.floor(this.props.playerStats.hp / 3));
                this.props.setCurrentEnemyHp(0);
                this.props.setCurrentEnemyStats({ name: 'Select Location', hp:0, dmg:0, attSpd:0, def:0, eva:0 });

                this.playerHpBar.style.width = `${Math.floor((this.props.currentPlayerHp/this.props.playerStats.hp)*100)}%`;
                this.enemyHpBar.style.width = '100%';
                this.playerDiv.classList.remove('dead');
            }, this.props.globalTimeout);
        }

        handleUseItem = (item) => {
            if(item.stats.heal) {
                const newHp = this.props.currentPlayerHp+item.stats.heal >= this.props.playerStats.hp ? this.props.playerStats.hp : this.props.currentPlayerHp+item.stats.heal;
                this.props.setCurrentPlayerHp(newHp);
                this.playerHpBar.style.width = `${Math.floor((newHp/this.props.playerStats.hp)*100)}%`;

                const itemKeyName = item.name.toLowerCase().replace(' ', '_');
                if (this.props.invItemCount[itemKeyName] > 1) {
                    let newItemCount = { ...this.props.invItemCount };
                    newItemCount[itemKeyName] = newItemCount[itemKeyName] - 1;
                    this.props.updateItemCount(newItemCount);
                } else {
                    let newItemCount = { ...this.props.invItemCount };
                    delete newItemCount[itemKeyName];
                    this.props.updateItemCount(newItemCount);
                }
            } else {
                console.log('Congratulations, You Did The Impossible');
            }
        }
    
        playerTakesDamage = (dmg, def, eva) => {
            if (this.shouldAttHit(eva)) {
                dmg = this.calcDef(dmg, def);
                dmg = this.calcDmg(dmg);

                this.playerAttStatus.innerHTML = `-${dmg}`;
                this.playerAttStatus.classList.remove('miss');
                this.playerAttStatus.classList.add('dmg');

                this.props.playerTakesDmg(dmg);
                this.playerHpBar.style.width = `${Math.floor((this.props.currentPlayerHp/this.props.playerStats.hp)*100)}%`;
            } else {
                this.playerAttStatus.classList.remove('dmg');
                this.playerAttStatus.classList.add('miss');
                this.playerAttStatus.innerHTML = 'miss';
            }
        }
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ENEMY LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
        startEnemyAttack = (dmg, attSpd, playerDef, playerEva) => {
            this.enemyAttProgressDiv.style.animation = `attBar ${attSpd}s linear infinite`;
            this.enemyAttInterval = setInterval(() => {  // Assigning it to a variable so i can stop the interval in resetActions
                this.playerTakesDamage(dmg, playerDef, playerEva);
                if (this.props.currentPlayerHp <= 0) this.handlePlayerDeath();
            }, attSpd * 1000);
        }
    
        handleEnemyDeath = (location) => {
            this.enemyDiv.classList.add('dead');
            this.initCombat(location);
            
            const drops = this.props.currentEnemy.drops;
            const dropKeys = Object.keys(this.props.currentEnemy.drops);
            const chance = Math.ceil(Math.random()*10000)/100;
            console.log(chance);
            dropKeys.forEach(drop => {
                if (chance >= drops[drop].min && chance < drops[drop].max) {
                    console.log(drop);
                    let newItemCount = { ...this.props.invItemCount };
                    newItemCount[drop] = (newItemCount[drop] || 0) + 1;
                    this.props.updateItemCount(newItemCount);
                }
            });
    
            setTimeout(() => {
                this.enemyDiv.classList.remove('dead');
            }, this.props.globalTimeout);
        }
        
        enemyTakesDamage = (dmg, def, eva) => {
            if (this.shouldAttHit(eva)) {
                dmg = this.calcDef(dmg, def);
                dmg = this.calcDmg(dmg);

                this.enemyAttStatus.innerHTML = `-${dmg}`;
                this.enemyAttStatus.classList.remove('miss');
                this.enemyAttStatus.classList.add('dmg');

                this.props.enemyTakesDmg(dmg);
                this.enemyHpBar.style.width = `${Math.floor((this.props.currentEnemyHp/this.props.currentEnemy.hp)*100)}%`;
            } else {
                this.enemyAttStatus.classList.remove('dmg');
                this.enemyAttStatus.classList.add('miss');
                this.enemyAttStatus.innerHTML = 'miss';
            }
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
                    playerAttStatus={el => this.playerAttStatus = el}

                    enemyHpBar={el => this.enemyHpBar = el}
                    enemyDiv={el => this.enemyDiv = el}
                    enemyAttProgressDiv={el => this.enemyAttProgressDiv = el}
                    enemyAttStatus={el => this.enemyAttStatus = el}
                />

                <InvAndEquip 
                    handleUseItem={this.handleUseItem} 
                    playerHpBar={this.playerHpBar}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
	return {
        locationEnemies: state.locationEnemies,
        playerStats: state.player.stats,
        invItemCount: state.inventory.itemCount,
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
        playerTakesDmg: damage => dispatch(playerTakesDamage(damage)),
        updateItemCount: itemCount => dispatch(updateItemCount(itemCount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
