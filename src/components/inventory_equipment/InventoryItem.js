import React from 'react';
import { connect } from 'react-redux';
import chickenMeat from '../../img/chicken_meat.png';
import ItemDescription from './ItemDescription';
import ItemMenu from './ItemMenu';
import { updatePlayerStats, updatePlayerEquipment } from '../../redux/player/playerAction';
import { updateItemCount, setCurrentPlayerHp } from '../../redux';
import hideShowDescriptionMenu from './hideShowDescriptionMenu';

function InventoryItem(props) {
    const removeItem = () => {

    }

    const { hideMenuState, hideDescriptionState, showDescription, hideDescription, toggleMenu, hideMenu, itemDiv, equipToQuickSlot } = props; // From HOC
    const { itemCount, itemList, handleUseItem, itemName, equipItem } = props;
    const item = itemList[itemName];
    return (
        <div className="inv-item" onMouseEnter={showDescription} onMouseLeave={hideDescription} onClick={toggleMenu} ref={itemDiv} >
            <img src={item.img ? item.img : chickenMeat} alt=""/>
            <div className="item-count">{itemCount[itemName]}</div>

            <ItemMenu 
                hideMenuState={hideMenuState} 
                hideMenu={hideMenu} 
                hideDescription={hideDescription}
                item={item}
                handleUseItem={handleUseItem}
                equipItem={equipItem}
                removeItem={removeItem}
                equipToQuickSlot={equipToQuickSlot}
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
