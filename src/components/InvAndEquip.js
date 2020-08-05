import React, { useState } from 'react';
import { connect } from 'react-redux';
import Inventory from './inventory_equipment/Inventory';
import Equipment from './inventory_equipment/Equipment';
import { updatePlayerStats, updatePlayerEquipment } from '../redux/player/playerAction';
import { updateItemCount, setCurrentPlayerHp } from '../redux';
import Message from './Message';

const InvAndEquip = React.memo((props) => {
    const { handleUseItem, playerHpBar } = props // From Game Container
    const { itemCount, playerStats, playerEquip, currentPlayerHp, globalTimeout } = props // State
    const { updatePlayerStats, updatePlayerEquipment, updateItemCount, setCurrentPlayerHp } = props // Dispatch

    const [msg, setMsg] = useState({});
    const [classStr, setMsgClass] = useState('msg-danger hide');

    const equipItem = item => {
        let newPlayerEquip = {...playerEquip};
        newPlayerEquip[item.type] = newPlayerEquip[item.type] ? newPlayerEquip[item.type] : 'empty slot';

        if (newPlayerEquip[item.type]==='empty slot' || item.name !== newPlayerEquip[item.type].name) { // App crashes if not checking for 'empty slow' because it tries to read newPlayerEquip[item.type].name
            unequipItem(playerEquip[item.type], newPlayerEquip[item.type]);
            const itemKeyName = item.name.toLowerCase().replace(' ', '_');

            newPlayerEquip[item.type] = item;
            updatePlayerEquipment(newPlayerEquip);

            let newPlayerStats = {...playerStats};
            const prevPlayerHp = newPlayerStats.hp;
            const itemStatKeys = Object.keys(item.stats);
            itemStatKeys.forEach(key => {
                if (key==='dmg' || key==='attSpd') newPlayerStats[key] = item.stats[key];
                else newPlayerStats[key] = newPlayerStats[key] + item.stats[key];
            });
            if (item.type === 'weapon') newPlayerStats.weapon = newPlayerEquip.weapon.name;
            updatePlayerStats(newPlayerStats);
            if (newPlayerStats.hp > prevPlayerHp) {
                const newCurrentHp = (newPlayerStats.hp - prevPlayerHp) + currentPlayerHp
                setCurrentPlayerHp(newCurrentHp);
                playerHpBar.style.width = `${Math.floor((newCurrentHp/newPlayerStats.hp)*100)}%`;
            } 

            if (itemCount[itemKeyName] > 1) {
                let newItemCount = { ...itemCount };
                newItemCount[itemKeyName] = newItemCount[itemKeyName] - 1;
                updateItemCount(newItemCount);
            } else {
                let newItemCount = { ...itemCount };
                delete newItemCount[itemKeyName];
                updateItemCount(newItemCount);
            }

        } else {
            setMsg({ str: `You already have the ${item.name} equipped`, img: item.img });
            setMsgClass('msg-danger');
            setTimeout(() => setMsgClass('msg-danger hide'), globalTimeout);
        }
    }

    
    const unequipItem = (item, emptySlot = false) => { // If the slot is empty don't run the code
        if (!emptySlot) {
            let newPlayerEquip = {...playerEquip};
            delete newPlayerEquip[item.type];
            updatePlayerEquipment(newPlayerEquip);

            let newPlayerStats = {...playerStats};
            const itemStatKeys = Object.keys(item.stats);
            itemStatKeys.forEach(key => {
                if (key==='dmg') newPlayerStats[key] = 5;
                else newPlayerStats[key] = newPlayerStats[key] - item.stats[key];
            });
            if (item.type === 'weapon') newPlayerStats.weapon = 'Fists';
            updatePlayerStats(newPlayerStats);
            if(item.stats.hp) setCurrentPlayerHp((currentPlayerHp-item.stats.hp))
            playerHpBar.style.width = (currentPlayerHp>newPlayerStats.hp) ? '100%' : `${Math.floor((currentPlayerHp/newPlayerStats.hp)*100)}%`;

            const itemKeyName = item.name.toLowerCase().replace(' ', '_');
            let newItemCount = { ...itemCount };
            newItemCount[itemKeyName] = (newItemCount[itemKeyName] || 0) + 1;
            updateItemCount(newItemCount);
        }
    }

    return (
        <div className="inv-equip">
            <Equipment unequipItem={unequipItem} />
            <Inventory handleUseItem={handleUseItem} equipItem={equipItem} />
            <Message notificationMessage={msg} classStr={classStr} invEquip={true}/>
        </div>
    )
});

const mapStateToProps = state => {
    return {
        itemCount: state.inventory.itemCount,
        playerStats: state.player.stats,
        playerEquip: state.player.equipped,
        currentPlayerHp: state.gameData.currentPlayerHp,
        globalTimeout: state.gameData.globalTimeout
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePlayerStats: newPlayerStats => dispatch(updatePlayerStats(newPlayerStats)),
        updatePlayerEquipment: newPlayerEquip => dispatch(updatePlayerEquipment(newPlayerEquip)),
        updateItemCount: newItemCount => dispatch(updateItemCount(newItemCount)),
        setCurrentPlayerHp: newHp => dispatch(setCurrentPlayerHp(newHp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvAndEquip)