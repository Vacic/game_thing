import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BattleScreen from './battlescreen/BattleScreen';
import LocationSelection from './location/LocationSelection';
import InvAndEquip from './inventory_equipment/InvAndEquip';
import ConfirmationModal from '../helperComponents/ConfirmationModal';
import LoadingModal from '../helperComponents/LoadingModal';
import Notifications from '../helperComponents/notifications/Notifications';
import { setCurrentPlayerHp, setCurrentEnemyHp, setCurrentEnemyStats, setLoading, enemyTakesDamage, playerTakesDamage, updateInventory, updatePlayerQuickBarEquipment, setMessage, setLoadingEnemy, cookieChecked, setLogin, populateGame, hideMessage, setNotification, populateUser } from '../../redux';
import { setLocalStorage, updateDbProgress, checkToken } from '../../services';



class GameContainer extends PureComponent {
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~GAME LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~
        componentDidMount = async () => {
            this.playerHpBar.style.width = `${Math.floor((this.props.currentPlayerHp/this.props.playerStats.hp)*100)}%`;
            if(!this.props.isCookieChecked) {
                localStorage.removeItem('progress');
                const cookie = await checkToken(this.props.history);
                if(cookie === true) {
                    this.props.setLogin(true);
                    await this.props.populateUser();
                    await this.props.populateGame();
                    this.playerHpBar.style.width = `${Math.floor((this.props.currentPlayerHp/this.props.playerStats.hp)*100)}%`;
                }
                this.props.cookieChecked();
            }
            if(this.props.loggedIn) this.updateProgressInterval = setInterval(() => updateDbProgress(this.props.history), 15000);
            setInterval(() => setLocalStorage(), 1000);
        }

        componentDidUpdate = (prevProps) => {
            if(this.props.loggedIn !== prevProps.loggedIn) {
                this.resetActions();
                this.enemyHpBar.style.width = '100%';
                this.playerHpBar.style.width = `${Math.floor((this.props.currentPlayerHp/this.props.playerStats.hp)*100)}%`;
            }
        }

        componentWillUnmount = () => {
            hideMessage();
            clearInterval(this.updateProgressInterval);
            this.stopCombat();
        }
        
        initCombat = (location) => {
            this.resetActions();
            this.props.setLoadingEnemy(true);
            this.loadingTimeout = setTimeout(() => {
                this.enemyHpBar.style.width = '100%'; // Whenever a new enemy is called the hp is reset to 100%
                this.getEnemy(location);
                
                this.startPlayerAttack(this.props.playerStats.dmg, this.props.playerStats.attSpd, this.props.currentEnemy.def, this.props.currentEnemy.eva)
                this.startEnemyAttack(this.props.currentEnemy.dmg, this.props.currentEnemy.attSpd, this.props.playerStats.def, this.props.playerStats.eva)

                this.props.setLoadingEnemy(false);
            }, this.props.globalTimeout);
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
            if(this.playerAttInterval) {
                this.playerAttProgressDiv.style.animation = 'none';
                this.enemyAttProgressDiv.style.animation = 'none';
                this.playerAttStatus.classList.remove('dmg');
                this.enemyAttStatus.classList.remove('dmg');
                this.playerAttStatus.classList.remove('miss');
                this.enemyAttStatus.classList.remove('miss');
                this.resetFlow = this.enemyAttProgressDiv.offsetHeight;  // resets the flow of the animations
                clearInterval(this.playerAttInterval);
                clearInterval(this.enemyAttInterval);
                clearTimeout(this.loadingTimeout);
            }
        }

        stopCombat = () => {
            this.resetActions();
            this.props.setCurrentEnemyStats({ name: 'Select Location', hp:0, dmg:0, attSpd:0, def:0, eva:0 });
            this.props.setCurrentEnemyHp(0);
            this.enemyHpBar.style.width = '100%';
            this.props.loadingEnemy && this.props.setLoadingEnemy(false);
        }

        resetPlayerAttack = (playerDmg, playerAttSpd) => {  // Using this after equipping a new weapon
            clearInterval(this.playerAttInterval);
            this.playerAttProgressDiv.style.animation = 'none';
            setTimeout(() => this.startPlayerAttack(playerDmg, playerAttSpd, this.props.currentEnemy.def, this.props.currentEnemy.eva), 100);
        }

        shouldAttHit = (eva) => {
            return Math.floor(Math.random() * 100) <= eva ? false : true;
        }

        calcDmg = (dmg) => {
            const randDmg = (Math.random() > 0.5) ? 
                            (Math.random() * (dmg - Math.ceil(dmg/2)) + Math.ceil(dmg/2)) : 
                            (Math.random() * (dmg - Math.floor(dmg/2)) + Math.floor(dmg/2))
            return Math.abs(Math.ceil(randDmg));
        }

        calcDef = (dmg, def) => {
            if ( def > 40 && dmg < def) return Math.ceil(dmg / 3);
            else return (Math.random() > 0.5) ? 
                        (dmg - Math.ceil(def / 3)) : 
                        (dmg - Math.floor(def / 3));
        }
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~PLAYER LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        startPlayerAttack = (dmg, attSpd, enemyDef, enemyEva) => {
            this.playerAttProgressDiv.style.animation = `attBar ${attSpd}s linear infinite`;
            this.playerAttInterval = setInterval(() => {  // Assigning it to a variable so i can stop the interval in 'resetActions'
                this.enemyTakesDamage(dmg, enemyDef, enemyEva);
                if (this.props.currentEnemyHp <= 0) this.handleEnemyDeath();
            }, attSpd * 1000);
        }
    
        handlePlayerDeath = () => {
            this.playerDiv.classList.add('dead');
            this.resetActions();
            
            setTimeout(() => {
                this.props.setCurrentPlayerHp(Math.floor(this.props.playerStats.hp / 2));
                this.props.setCurrentEnemyHp(0);
                this.props.setCurrentEnemyStats({ name: 'Select Location', hp:0, dmg:0, attSpd:0, def:0, eva:0 });

                this.playerHpBar.style.width = `${Math.floor((this.props.currentPlayerHp/this.props.playerStats.hp)*100)}%`;
                this.enemyHpBar.style.width = '100%';
                this.playerDiv.classList.remove('dead');
            }, this.props.globalTimeout);
        }

        handleUseItem = (item) => {
            if(item && item.stats.heal) {
                const newHp = this.props.currentPlayerHp+item.stats.heal >= this.props.playerStats.hp ? this.props.playerStats.hp : this.props.currentPlayerHp+item.stats.heal;
                this.props.setCurrentPlayerHp(newHp);
                this.playerHpBar.style.width = `${Math.floor((newHp/this.props.playerStats.hp)*100)}%`;

                const itemKeyName = item.name.toLowerCase().replace(/ /g, '_');
                if (this.props.inventory[itemKeyName] > 1) {
                    let newInventory = { ...this.props.inventory };
                    newInventory[itemKeyName] = newInventory[itemKeyName] - 1;
                    this.props.updateInventory(newInventory);
                } else {
                    let newInventory = { ...this.props.inventory };
                    delete newInventory[itemKeyName];
                    this.props.updateInventory(newInventory);
                    // Remove from quickbar
                    let newQBEquip = this.props.quickBarEquipment.slice();
                    newQBEquip = newQBEquip.map(item => item.replace(itemKeyName, ''))
                    this.props.updatePlayerQuickBarEquipment(newQBEquip);
                }
            } else {
                console.log('Congratulations, You Did The Impossible');
            }
        }
    
        playerTakesDamage = (enemyDmg, def, eva) => {
            if (this.shouldAttHit(eva)) {
                console.log(`max dmg: ${enemyDmg}`)
                let newEnemyDmg = this.calcDef(enemyDmg, def);
                console.log(`dmg after def: ${newEnemyDmg}`)
                newEnemyDmg = this.calcDmg(newEnemyDmg);
                console.log(`dmg done: ${newEnemyDmg}`)

                this.playerAttStatus.innerHTML = `-${newEnemyDmg}`;
                this.playerAttStatus.classList.remove('miss');
                this.playerAttStatus.classList.add('dmg');

                this.props.playerTakesDmg(newEnemyDmg);
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
    
        handleEnemyDeath = () => {
            this.enemyDiv.classList.add('dead');
            this.initCombat(this.props.currentLocation);
            
            const drops = this.props.currentEnemy.drops;
            const dropKeys = Object.keys(this.props.currentEnemy.drops);
            const chance = Math.ceil(Math.random()*10000)/100;
            dropKeys.forEach(drop => {
                if (chance >= drops[drop].min && chance < drops[drop].max) {
                    const { name, img } = this.props.itemList[drop];
                    let newInventory = { ...this.props.inventory };
                    newInventory[drop] = (newInventory[drop] || 0) + 1;
                    this.props.updateInventory(newInventory);
                    this.props.setNotification({ msg: `You have recieved ${name}`, img });
                }
            });
            
            setTimeout(() => {
                this.enemyDiv.classList.remove('dead');
            }, this.props.globalTimeout);
        }
        
        enemyTakesDamage = (playerDmg, def, eva) => {
            if (this.shouldAttHit(eva)) {
                playerDmg = this.calcDef(playerDmg, def);
                playerDmg = this.calcDmg(playerDmg);

                this.enemyAttStatus.innerHTML = `-${playerDmg}`;
                this.enemyAttStatus.classList.remove('miss');
                this.enemyAttStatus.classList.add('dmg');

                this.props.enemyTakesDmg(playerDmg);
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
                    handleUseItem={this.handleUseItem}

                    enemyHpBar={el => this.enemyHpBar = el}
                    enemyDiv={el => this.enemyDiv = el}
                    enemyAttProgressDiv={el => this.enemyAttProgressDiv = el}
                    enemyAttStatus={el => this.enemyAttStatus = el}

                    initCombat={this.initCombat} 
                    stopCombat={this.stopCombat}
                />
                <InvAndEquip 
                    handleUseItem={this.handleUseItem} 
                    playerHpBar={this.playerHpBar}
                    resetPlayerAttack={this.resetPlayerAttack}
                />

                <Notifications />

                <ConfirmationModal />
                {!this.props.isCookieChecked && <LoadingModal />}
            </div>
        )
    }
}

const mapStateToProps = state => {
	return {
        locationEnemies: state.locationEnemies,
        playerStats: state.player.stats,
        inventory: state.player.inventory,
        itemList: state.items,
        equipment: state.player.equipped,
        quickBarEquipment: state.player.quickBarEquipment,
        currentEnemyHp: state.gameData.currentEnemyHp,
        currentPlayerHp: state.gameData.currentPlayerHp,
        globalTimeout: state.gameData.globalTimeout,
        isLoading: state.gameData.isLoading,
        currentLocation: state.gameData.currentLocation,
        currentEnemy: state.gameData.currentEnemy,
        loadingEnemy: state.gameData.loadingEnemy,

        loggedIn: state.gameData.loggedIn,
        isCookieChecked: state.gameData.isCookieChecked
	}
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentEnemyHp: currentEnemyHp => dispatch(setCurrentEnemyHp(currentEnemyHp)),
        setCurrentEnemyStats: currentEnemy => dispatch(setCurrentEnemyStats(currentEnemy)),
        setCurrentPlayerHp: currentPlayerHp => dispatch(setCurrentPlayerHp(currentPlayerHp)),
        setLoading: (isLoading) => dispatch(setLoading(isLoading)),
        enemyTakesDmg: damage => dispatch(enemyTakesDamage(damage)),
        playerTakesDmg: damage => dispatch(playerTakesDamage(damage)),
        updateInventory: itemCount => dispatch(updateInventory(itemCount)),
        updatePlayerQuickBarEquipment: newQBEquip => dispatch(updatePlayerQuickBarEquipment(newQBEquip)),
        setMessage: newMessage => dispatch(setMessage(newMessage)),
        hideMessage: () => dispatch(hideMessage()),
        setNotification: newNotif => dispatch(setNotification(newNotif)),
        setLoadingEnemy: isLoading => dispatch(setLoadingEnemy(isLoading)),

        cookieChecked: () => dispatch(cookieChecked()),
        setLogin: (isLoggedIn) => dispatch(setLogin(isLoggedIn)),
        populateGame: () => dispatch(populateGame()),
        populateUser: () => dispatch(populateUser())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameContainer));
