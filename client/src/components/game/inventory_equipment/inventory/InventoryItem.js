import React from "react";
import { connect } from "react-redux";
import ItemDescription from "../ItemDescription";
import ItemMenu from "../ItemMenu";
import hideShowDescriptionMenu from "../hideShowDescriptionMenu";
import chicken from "../../../../img/chicken_meat.png";
import {
  updateInventory,
  setCurrentPlayerHp,
  updatePlayerStats,
  updatePlayerEquipment,
} from "../../../../redux";

const InventoryItem = (props) => {
  const {
    hideMenuState,
    hideDescriptionState,
    showDescription,
    hideDescription,
    toggleMenu,
    hideMenu,
    itemDiv,
  } = props; // From HOC
  const {
    inventory,
    itemList,
    handleUseItem,
    itemName,
    equipItem,
    removeAllItems,
    removeItem,
    equipToQuickSlot,
    showModal,
    id,
  } = props;
  const item = itemList[itemName];
  return (
    <div
      className="inv-item"
      id={id}
      onMouseEnter={showDescription}
      onMouseLeave={hideDescription}
      onClick={toggleMenu}
      ref={itemDiv}
    >
      <img src={item.img ? item.img : chicken} alt="" />
      <div className="item-count">{inventory[itemName]}</div>

      <ItemMenu
        hideMenuState={hideMenuState}
        hideMenu={hideMenu}
        hideDescription={hideDescription}
        item={item}
        handleUseItem={handleUseItem}
        equipItem={equipItem}
        removeAllItems={removeAllItems}
        removeItem={removeItem}
        equipToQuickSlot={equipToQuickSlot}
        showModal={showModal}
      />

      <ItemDescription
        item={item}
        hideDescriptionState={hideDescriptionState}
        hideDescription={hideDescription}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  inventory: state.player.inventory,
  itemList: state.items,
  playerBaseStats: state.player.baseStats,
  playerStats: state.player.stats,
  playerEquip: state.player.equipped,
  currentPlayerHp: state.gameData.currentPlayerHp,
});

const mapDispatchToProps = (dispatch) => ({
  updatePlayerStats: (newPlayerStats) =>
    dispatch(updatePlayerStats(newPlayerStats)),
  updatePlayerEquipment: (newPlayerEquip) =>
    dispatch(updatePlayerEquipment(newPlayerEquip)),
  updateInventory: (newInventory) => dispatch(updateInventory(newInventory)),
  setCurrentPlayerHp: (newHp) => dispatch(setCurrentPlayerHp(newHp)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hideShowDescriptionMenu(InventoryItem));
