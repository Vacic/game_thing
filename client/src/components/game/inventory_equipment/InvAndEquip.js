import React from "react";
import { connect } from "react-redux";
import Inventory from "./inventory/Inventory";
import Equipment from "./equipment/Equipment";
import {
  updateInventory,
  setCurrentPlayerHp,
  updatePlayerStats,
  updatePlayerEquipment,
  updatePlayerQuickBarEquipment,
  reduceSingleItem,
  setNotification,
} from "../../../redux";

const InvAndEquip = React.memo((props) => {
  const { handleUseItem, playerHpBar, resetPlayerAttack } = props; // From Game Container
  const {
    inventory,
    playerStats,
    playerEquip,
    currentPlayerHp,
    quickBarEquipment,
    currentEnemy,
  } = props; // State
  const {
    updatePlayerStats,
    updatePlayerEquipment,
    updateInventory,
    setCurrentPlayerHp,
    updatePlayerQuickBarEquipment,
    reduceSingleItem,
    setNotification,
  } = props; // Dispatch

  const equipItem = (item) => {
    let newPlayerEquip = { ...playerEquip };
    let newInventory = { ...inventory };
    const prevPlayerHp = playerStats.hp;
    const itemStatKeys = Object.keys(item.stats);
    const itemKeyName = item.name.toLowerCase().replace(/ /g, "_");
    const emptySlot = newPlayerEquip[item.type] ? false : true;

    if (emptySlot || item.name !== newPlayerEquip[item.type].name) {
      // App crashes if not checking for 'emptySlot' because it tries to read newPlayerEquip[item.type].name
      //  Decreasing item count from inventory
      if (newInventory[itemKeyName] > 1) {
        newInventory[itemKeyName] = newInventory[itemKeyName] - 1;
        updateInventory(newInventory);
      } else {
        delete newInventory[itemKeyName];
        updateInventory(newInventory);
      }
      // Unequip current item and get new player stats after the item has been unequipped
      let newPlayerStats = unequipItem(
        newPlayerEquip[item.type],
        emptySlot,
        newInventory
      );
      // Equip the new item
      newPlayerEquip[item.type] = item;
      updatePlayerEquipment(newPlayerEquip);
      // Setting new player stats
      itemStatKeys.forEach((key) => {
        switch (item.type) {
          case "weapon":
            newPlayerStats[key] = equipWeapon(item, key);
            break;
          case "boots":
            newPlayerStats[key] = equipBoots(item, key, newPlayerStats);
            break;
          default:
            newPlayerStats[key] = newPlayerStats[key] + item.stats[key];
            break;
        }
      });
      if (item.type === "weapon") {
        newPlayerStats.weapon = newPlayerEquip.weapon.name;
        if (currentEnemy.hp !== 0)
          resetPlayerAttack(newPlayerStats.dmg, newPlayerStats.attSpd); // resets attack and applies new values
      }
      updatePlayerStats(newPlayerStats);
      // Update currentPlayerHp
      const newCurrentHp = newPlayerStats.hp - prevPlayerHp + currentPlayerHp;
      setCurrentPlayerHp(newCurrentHp);
      playerHpBar.style.width = `${Math.floor(
        (newCurrentHp / newPlayerStats.hp) * 100
      )}%`;
    } else
      setNotification({
        classType: "danger",
        msg: `You have already equipped ${item.name}`,
        img: item.img,
      });
  };

  const unequipItem = (item, emptySlot = false, prevItemCount = false) => {
    // If the slot is empty don't run the code // prevItemCount needed to update the inventory correctly
    if (!emptySlot) {
      let newPlayerStats = { ...playerStats };
      let newPlayerEquip = { ...playerEquip };
      const itemKeyName = item.name.toLowerCase().replace(/ /g, "_");
      const itemStatKeys = Object.keys(item.stats);
      // Remove equipped item
      delete newPlayerEquip[item.type];
      updatePlayerEquipment(newPlayerEquip);
      // Update player stats
      itemStatKeys.forEach((key) => {
        switch (item.type) {
          case "weapon":
            newPlayerStats[key] = unequipWeapon(key);
            break;
          case "boots":
            newPlayerStats[key] = unequipBoots(item, key, newPlayerStats);
            break;
          default:
            newPlayerStats[key] = newPlayerStats[key] - item.stats[key];
            break;
        }
      });
      if (item.type === "weapon") newPlayerStats.weapon = "Fists";
      updatePlayerStats(newPlayerStats);
      // Update currentPlayerHp
      if (item.stats.hp) {
        const newCurrentHp = currentPlayerHp - item.stats.hp;
        setCurrentPlayerHp(newCurrentHp);
        playerHpBar.style.width = `${Math.floor(
          (newCurrentHp / newPlayerStats.hp) * 100
        )}%`;
      }
      // Update inventory item count
      if (prevItemCount) {
        prevItemCount[itemKeyName] = (prevItemCount[itemKeyName] || 0) + 1;
        updateInventory(prevItemCount);
      } else {
        let newInventory = { ...inventory };
        newInventory[itemKeyName] = (newInventory[itemKeyName] || 0) + 1;
        updateInventory(newInventory);
      }
      return newPlayerStats;
    } else return playerStats;
  };

  const equipToQuickSlot = (item) => {
    let newQBEquip = quickBarEquipment.slice();
    const itemKeyName = item.name.toLowerCase().replace(/ /g, "_");

    newQBEquip.push(itemKeyName);
    newQBEquip.shift();

    updatePlayerQuickBarEquipment(newQBEquip);
  };

  const removeAllItems = (item) => {
    const itemKeyName = item.name.toLowerCase().replace(/ /g, "_");
    let newInventory = { ...inventory };
    delete newInventory[itemKeyName];
    updateInventory(newInventory);
  };

  const removeItem = (item) => {
    const itemKeyName = item.name.toLowerCase().replace(/ /g, "_");
    let newInventory = { ...inventory };

    if (newInventory[itemKeyName] > 1) reduceSingleItem(itemKeyName);
    else {
      delete newInventory[itemKeyName];
      updateInventory(newInventory);
    }
  };

  const equipWeapon = (item, statKey) => {
    if (
      playerEquip.boots !== undefined &&
      playerEquip.boots.stats.attSpd !== undefined &&
      statKey === "attSpd"
    )
      return (
        Math.round(
          (item.stats[statKey] + playerEquip.boots.stats.attSpd) * 10
        ) / 10
      );
    else return item.stats[statKey];
  };

  const equipBoots = (item, statKey, playerStats) => {
    if (statKey === "attSpd")
      return Math.round((playerStats[statKey] + item.stats[statKey]) * 10) / 10;
    else return playerStats[statKey] + item.stats[statKey];
  };

  const unequipBoots = (item, statKey, playerStats) => {
    if (statKey === "attSpd")
      return Math.round((playerStats[statKey] - item.stats[statKey]) * 10) / 10;
    else return playerStats[statKey] - item.stats[statKey];
  };

  const unequipWeapon = (stat) => {
    if (stat === "dmg") return 5;
    else if (
      stat === "attSpd" &&
      playerEquip.boots !== undefined &&
      playerEquip.boots.stats.attSpd !== undefined
    )
      return Math.round((1 + playerEquip.boots.stats.attSpd) * 10) / 10;
    else if (stat === "attSpd") return 1;
  };

  return (
    <div className="inv-equip">
      <Equipment unequipItem={unequipItem} />
      <Inventory
        handleUseItem={handleUseItem}
        equipItem={equipItem}
        equipToQuickSlot={equipToQuickSlot}
        removeItem={removeItem}
        removeAllItems={removeAllItems}
      />
    </div>
  );
});

const mapStateToProps = (state) => ({
  inventory: state.player.inventory,
  playerStats: state.player.stats,
  playerEquip: state.player.equipped,
  quickBarEquipment: state.player.quickBarEquipment,
  currentPlayerHp: state.gameData.currentPlayerHp,
  globalTimeout: state.gameData.globalTimeout,
  currentEnemy: state.gameData.currentEnemy,
});

const mapDispatchToProps = (dispatch) => ({
  updatePlayerStats: (newPlayerStats) =>
    dispatch(updatePlayerStats(newPlayerStats)),
  updatePlayerEquipment: (newPlayerEquip) =>
    dispatch(updatePlayerEquipment(newPlayerEquip)),
  updateInventory: (newInventory) => dispatch(updateInventory(newInventory)),
  reduceSingleItem: (itemName) => dispatch(reduceSingleItem(itemName)),
  setNotification: (newNotif) => dispatch(setNotification(newNotif)),
  setCurrentPlayerHp: (newHp) => dispatch(setCurrentPlayerHp(newHp)),
  updatePlayerQuickBarEquipment: (newQBEquip) =>
    dispatch(updatePlayerQuickBarEquipment(newQBEquip)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvAndEquip);
