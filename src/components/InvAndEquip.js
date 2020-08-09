import React from 'react';
import { connect } from 'react-redux';
import Inventory from './inventory_equipment/Inventory';
import Equipment from './inventory_equipment/Equipment';
import { updateItemCount, setCurrentPlayerHp, updatePlayerStats, updatePlayerEquipment, updatePlayerQuickBarEquipment } from '../redux';

const InvAndEquip = React.memo((props) => {
    const { handleUseItem, playerHpBar, setMessage, showModal, resetPlayerAttack } = props // From Game Container
    const { itemCount, playerStats, playerEquip, currentPlayerHp, quickBarEquipment, currentEnemy } = props // State
    const { updatePlayerStats, updatePlayerEquipment, updateItemCount, setCurrentPlayerHp, updatePlayerQuickBarEquipment } = props // Dispatch

    const equipItem = item => {
        let newPlayerEquip = {...playerEquip};
        let newItemCount = { ...itemCount };
        const prevPlayerHp = playerStats.hp;
        const itemStatKeys = Object.keys(item.stats);
        const itemKeyName = item.name.toLowerCase().replace(/ /g, '_');
        const emptySlot = newPlayerEquip[item.type] ? false : true;
        
        if (emptySlot || item.name !== newPlayerEquip[item.type].name) { // App crashes if not checking for 'empty slow' because it tries to read newPlayerEquip[item.type].name
        //  Decreasing item count from inventory
        if (newItemCount[itemKeyName] > 1) {
            newItemCount[itemKeyName] = newItemCount[itemKeyName] - 1;
            updateItemCount(newItemCount);
        } else {
            delete newItemCount[itemKeyName];
            updateItemCount(newItemCount);
        }
        // Unequip current item and get new player stats after the item has been unequipped
        let newPlayerStats = unequipItem(newPlayerEquip[item.type], emptySlot, newItemCount);
        // Equip the new item
        newPlayerEquip[item.type] = item;
        updatePlayerEquipment(newPlayerEquip);
        // Setting new player stats
        itemStatKeys.forEach(key => {
            switch(item.type) {
                case 'weapon': newPlayerStats[key] = equipWeapon(item, key); break;
                case 'boots': newPlayerStats[key] = equipBoots(item, key, newPlayerStats); break;
                default: newPlayerStats[key] = newPlayerStats[key] + item.stats[key]; break;
            }
        });
        if (item.type === 'weapon') {
            newPlayerStats.weapon = newPlayerEquip.weapon.name;
            if (currentEnemy.hp!==0) resetPlayerAttack(newPlayerStats.dmg, newPlayerStats.attSpd);  // resets attack and applies new values
        }
        updatePlayerStats(newPlayerStats);
        // Update currentPlayerHp
        const newCurrentHp = (newPlayerStats.hp - prevPlayerHp) + currentPlayerHp
        setCurrentPlayerHp(newCurrentHp);
        playerHpBar.style.width = `${Math.floor((newCurrentHp/newPlayerStats.hp)*100)}%`;
        } else {
            setMessage({item, class: 'msg-danger', str:'You have already equipped'});
        }
    }

    const unequipItem = (item, emptySlot = false, prevItemCount = false) => { // If the slot is empty don't run the code // prevItemCount needed to update the inventory correctly
        if (!emptySlot) {
            let newPlayerStats = {...playerStats};
            let newPlayerEquip = {...playerEquip};
            const itemKeyName = item.name.toLowerCase().replace(/ /g, '_');
            const itemStatKeys = Object.keys(item.stats);
            // Remove equipped item
            delete newPlayerEquip[item.type];
            updatePlayerEquipment(newPlayerEquip);
            // Update player stats
            itemStatKeys.forEach(key => {
                switch(item.type) {
                    case 'weapon': newPlayerStats[key] = unequipWeapon(key); break;
                    case 'boots': newPlayerStats[key] = unequipBoots(item, key, newPlayerStats); break;
                    default: newPlayerStats[key] = newPlayerStats[key] - item.stats[key]; break;
                }
            });
            if (item.type === 'weapon') newPlayerStats.weapon = 'Fists';
            updatePlayerStats(newPlayerStats);
            // Update currentPlayerHp
            if(item.stats.hp) {
                const newCurrentHp = currentPlayerHp-item.stats.hp;
                setCurrentPlayerHp((newCurrentHp))
                playerHpBar.style.width = `${Math.floor((newCurrentHp/newPlayerStats.hp)*100)}%`;
            }
            // Update inventory item count
            if (prevItemCount) {
                prevItemCount[itemKeyName] = (prevItemCount[itemKeyName] || 0) + 1;
                updateItemCount(prevItemCount);
            } else {
                let newItemCount = {...itemCount};
                newItemCount[itemKeyName] = (newItemCount[itemKeyName] || 0) + 1;
                updateItemCount(newItemCount);
            }
            return newPlayerStats;
        } else {
            return playerStats;
        }
    }

    const equipToQuickSlot = item => {
        let newQBEquip = quickBarEquipment.slice();
        const itemKeyName = item.name.toLowerCase().replace(/ /g, '_');

        newQBEquip.push(itemKeyName);
        newQBEquip.shift();

        updatePlayerQuickBarEquipment(newQBEquip);
    }
    
    const removeAllItems = item => {
        const itemKeyName = item.name.toLowerCase().replace(/ /g, '_');
        let newItemCount = {...itemCount};
        delete newItemCount[itemKeyName];
        updateItemCount(newItemCount);
    }

    const removeItem = item => {
        const itemKeyName = item.name.toLowerCase().replace(/ /g, '_');
        let newItemCount = {...itemCount};

        if (newItemCount[itemKeyName] > 1) {
            newItemCount[itemKeyName] = newItemCount[itemKeyName] - 1;
            updateItemCount(newItemCount);
        } else {
            delete newItemCount[itemKeyName];
            updateItemCount(newItemCount);
        }
    }

    const equipWeapon = (item, statKey) => {
        if (playerEquip.boots !== undefined && playerEquip.boots.stats.attSpd !== undefined && statKey==='attSpd') return Math.round((item.stats[statKey] + playerEquip.boots.stats.attSpd) * 10) / 10;
        else return item.stats[statKey];
    }

    const equipBoots = (item, statKey, playerStats) => {
        if (statKey==='attSpd') return Math.round((playerStats[statKey] + item.stats[statKey]) * 10) / 10;
        else return playerStats[statKey] + item.stats[statKey];
    }

    const unequipBoots = (item, statKey, playerStats) => {
        if (statKey==='attSpd') return Math.round((playerStats[statKey] - item.stats[statKey]) * 10) / 10;
        else return playerStats[statKey] - item.stats[statKey];
    }

    const unequipWeapon = (stat) => {
        if (stat==='dmg') return 5;
        else if (stat==='attSpd' && playerEquip.boots !== undefined && playerEquip.boots.stats.attSpd !== undefined) return Math.round((1 + playerEquip.boots.stats.attSpd) * 10) / 10;
        else if (stat==='attSpd') return 1;
    }

    return (
        <div className="inv-equip">
            <Equipment unequipItem={unequipItem} />
            <Inventory handleUseItem={handleUseItem} equipItem={equipItem} equipToQuickSlot={equipToQuickSlot} removeItem={removeItem} removeAllItems={removeAllItems} showModal={showModal} />
        </div>
    )
});

const mapStateToProps = state => {
    return {
        itemCount: state.inventory.itemCount,
        playerStats: state.player.stats,
        playerEquip: state.player.equipped,
        quickBarEquipment: state.player.quickBarEquipment,
        currentPlayerHp: state.gameData.currentPlayerHp,
        globalTimeout: state.gameData.globalTimeout,
        currentEnemy: state.gameData.currentEnemy
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePlayerStats: newPlayerStats => dispatch(updatePlayerStats(newPlayerStats)),
        updatePlayerEquipment: newPlayerEquip => dispatch(updatePlayerEquipment(newPlayerEquip)),
        updateItemCount: newItemCount => dispatch(updateItemCount(newItemCount)),
        setCurrentPlayerHp: newHp => dispatch(setCurrentPlayerHp(newHp)),
        updatePlayerQuickBarEquipment: newQBEquip => dispatch(updatePlayerQuickBarEquipment(newQBEquip))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvAndEquip)