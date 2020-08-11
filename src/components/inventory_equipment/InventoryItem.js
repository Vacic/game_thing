import React from 'react';
import { connect } from 'react-redux';
import ItemDescription from './ItemDescription';
import ItemMenu from './ItemMenu';
import { updateItemCount, setCurrentPlayerHp, updatePlayerStats, updatePlayerEquipment } from '../../redux';
import hideShowDescriptionMenu from './hideShowDescriptionMenu';

function InventoryItem(props) {
    const { hideMenuState, hideDescriptionState, showDescription, hideDescription, toggleMenu, hideMenu, itemDiv } = props; // From HOC
    const { itemCount, itemList, handleUseItem, itemName, equipItem, removeAllItems, removeItem, equipToQuickSlot, showModal, id } = props;
    const item = itemList[itemName];
    return (
        <div className="inv-item" id={id} onMouseEnter={showDescription} onMouseLeave={hideDescription} onClick={toggleMenu} ref={itemDiv}>
            <img src={item.img ? item.img : console.log('Img Missing: Inventory Item')} alt=""/>
            <div className="item-count">{itemCount[itemName]}</div>

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
    )
}

const mapStateToProps = state => {
    return {
        itemCount: state.inventory.itemCount,
        itemList: state.items,
        playerBaseStats: state.player.baseStats,
        playerStats: state.player.stats,
        playerEquip: state.player.equipped,
        currentPlayerHp: state.gameData.currentPlayerHp
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

export default connect(mapStateToProps, mapDispatchToProps)(hideShowDescriptionMenu(InventoryItem));
