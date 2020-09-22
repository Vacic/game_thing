import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BattleScreen from './BattleScreen';
import LocationSelection from './location/LocationSelection';
import { setCurrentPlayerHp, setCurrentEnemyHp, setCurrentEnemyStats, toggleLoading, enemyTakesDamage, playerTakesDamage, updateInventory, setCurrentLocation, setNotificationMessage, setNotificationClass, updatePlayerQuickBarEquipment, setMessage, setLoadingEnemy, cookieChecked, setLogin, populateGame, hideMessage } from '../redux';
import InvAndEquip from './InvAndEquip';
import Message from './Message';
import ConfirmationModal from './ConfirmationModal';
import { setLocalStorage, updateDbProgress } from '../helpers';
import { checkToken } from '../helpers/checkToken';


class GameContainer extends PureComponent {
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~GAME LOGIC~~~~~~~~~~~~~~~~~~~~~~~~~
        constructor(props) {
            super(props)
        
            this.state = {
                msg: [],
                isMsgHidden: true,

                modalText: '',
                modalFunc: () => null,
                itemToRemove: {},
                isModalHidden: true
            }
        }
        componentDidMount = async () => {
            checkToken(this.props.history)
            if(!this.props.isCookieChecked) {
                this.props.cookieChecked();
                localStorage.removeItem('progress');
                const cookie = await checkToken(this.props.history);
                if(cookie === true) {
                    this.props.setLogin(true);
                    await this.props.populateGame();
                    this.playerHpBar.style.width = `${Math.floor((this.props.currentPlayerHp/this.props.playerStats.hp)*100)}%`;
                }
            }
            setInterval(() => setLocalStorage(), 1000);
        }

        componentDidUpdate = (prevProps) => {
            if(this.props.loggedIn !== prevProps.loggedIn) {
                this.resetActions();
                this.props.setCurrentEnemyHp(0);
                this.props.setCurrentEnemyStats({ name: 'Select Location', hp:0, dmg:0, attSpd:0, def:0, eva:0 });
                this.enemyHpBar.style.width = '100%';
                this.playerHpBar.style.width = `${Math.floor((this.props.currentPlayerHp/this.props.playerStats.hp)*100)}%`;
                if(this.props.loggedIn) this.updateProgressInterval = setInterval(() => updateDbProgress(this.props.history), 15000);
                else {
                    clearInterval(this.updateProgressInterval);
                }
            }
        }

        componentWillUnmount = () => {
            hideMessage();
            this.resetActions();
        }
        
        initCombat = (location) => {
            this.resetActions();
            this.props.setLoadingEnemy();
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

            this.props.setCurrentLocation(location);
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

        resetPlayerAttack = (playerDmg, playerAttSpd) => {  // Using this after equipping a new weapon
            clearInterval(this.playerAttInterval);
            this.playerAttProgressDiv.style.animation = 'none';
            setTimeout(() => this.startPlayerAttack(playerDmg, playerAttSpd, this.props.currentEnemy.def, this.props.currentEnemy.eva), 100);
        }

        shouldAttHit = (eva) => {
            return Math.floor(Math.random() * 100) <= eva ? false : true;
        }

        calcDmg = (dmg) => {
            const randDmg = (Math.random() > 0.5) ? (Math.random() * (dmg - Math.ceil(dmg/2)) + Math.ceil(dmg/2)) : (Math.random() * (dmg - Math.floor(dmg/2)) + Math.floor(dmg/2))
            return Math.ceil(randDmg);
        }

        calcDef = (dmg, def) => {
            if ( def > 40 && dmg < def) return Math.ceil(dmg / 3);
            else  return (dmg - Math.ceil(def / 3));
        }

        setNotification = (msg) => {
            if (this.timeout) clearTimeout(this.timeout);
            this.setState({ isMsgHidden: false });
            
            let newMsg = this.state.msg.slice();
            newMsg.unshift(msg);
            this.setState({msg: newMsg});

            setTimeout(() => {
                let newNewMsg = this.state.msg.slice();
                newNewMsg.pop();
                this.setState({msg: newNewMsg});
            }, 2000)

            this.timeout = setTimeout(() => {
                this.setState({ isMsgHidden: true });
            }, 1500);
        }

        showModal = (text, func, item) => {
            this.setState({ isModalHidden: false, modalText: text, modalFunc: func, itemToRemove: item });
        }

        hideModal = () => {
            this.setState({ isModalHidden: true });
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
                enemyDmg = this.calcDef(enemyDmg, def);
                enemyDmg = this.calcDmg(enemyDmg);

                this.playerAttStatus.innerHTML = `-${enemyDmg}`;
                this.playerAttStatus.classList.remove('miss');
                this.playerAttStatus.classList.add('dmg');

                this.props.playerTakesDmg(enemyDmg);
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
                    let newInventory = { ...this.props.inventory };
                    newInventory[drop] = (newInventory[drop] || 0) + 1;
                    this.props.updateInventory(newInventory);
                    this.setNotification({item: this.props.itemList[drop], class:'msg-success', str:'You have recieved'});
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
                />

                <InvAndEquip 
                    handleUseItem={this.handleUseItem} 
                    playerHpBar={this.playerHpBar}
                    setNotification={this.setNotification}
                    showModal={this.showModal}
                    resetPlayerAttack={this.resetPlayerAttack}
                />
                <div className={this.state.isMsgHidden ? 'msg hide' : 'msg'}>
                    {this.state.msg.map((msg, i) => <Message key={i} msg={msg} i={i} />)}
                </div>

                <ConfirmationModal text={this.state.modalText} func={this.state.modalFunc} isHidden={this.state.isModalHidden} hideModal={this.hideModal} itemToRemove={this.state.itemToRemove} />
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

        loggedIn: state.gameData.loggedIn,
        isCookieChecked: state.gameData.isCookieChecked
	}
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentEnemyHp: currentEnemyHp => dispatch(setCurrentEnemyHp(currentEnemyHp)),
        setCurrentEnemyStats: currentEnemy => dispatch(setCurrentEnemyStats(currentEnemy)),
        setCurrentPlayerHp: currentPlayerHp => dispatch(setCurrentPlayerHp(currentPlayerHp)),
        setCurrentLocation: location => dispatch(setCurrentLocation(location)),
        setNotificationMessage: message => dispatch(setNotificationMessage(message)),
        setNotificationClass: classStr => dispatch(setNotificationClass(classStr)),
        toggleLoading: (isLoading) => dispatch(toggleLoading(isLoading)),
        enemyTakesDmg: damage => dispatch(enemyTakesDamage(damage)),
        playerTakesDmg: damage => dispatch(playerTakesDamage(damage)),
        updateInventory: itemCount => dispatch(updateInventory(itemCount)),
        updatePlayerQuickBarEquipment: newQBEquip => dispatch(updatePlayerQuickBarEquipment(newQBEquip)),
        setMessage: newMessage => dispatch(setMessage(newMessage)),
        hideMessage: () => dispatch(hideMessage()),
        setLoadingEnemy: () => dispatch(setLoadingEnemy()),

        cookieChecked: () => dispatch(cookieChecked()),
        setLogin: (isLoggedIn) => dispatch(setLogin(isLoggedIn)),
        populateGame: () => dispatch(populateGame())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameContainer));
