import React from 'react';

function ItemMenu({ item, hideMenuState, hideMenu, handleUseItem, equipItem, removeAllItems, removeItem, unequipItem, equipToQuickSlot, hideDescription, showModal }) {
    if (!unequipItem && item.stats.heal) { return (
        <div className={hideMenuState ? "item-menu hide" : "item-menu"} onMouseLeave={hideMenu} onClick={hideDescription}>
            <div className="item-use" onClick={() => {handleUseItem(item)}}>Use</div>
            <div className="item-equip" onClick={() => equipToQuickSlot(item)}>Equip</div>
            <div className="item-remove" onClick={() => showModal(`Are you sure you want to remove all of your ${item.name}`, removeAllItems, item)}>Remove All</div>
        </div>

    )} else if (!unequipItem) { return (
        <div className={hideMenuState ? "item-menu hide" : "item-menu"} onMouseLeave={hideMenu}>
            <div className="item-equip" onClick={() => equipItem(item)}>Equip</div>
            <div className="item-remove" onClick={() => showModal(`Are you sure you want to remove 1 of your ${item.name}`, removeItem, item)}>Remove 1</div>
            <div className="item-remove" onClick={() => showModal(`Are you sure you want to remove all of your ${item.name}`, removeAllItems, item)}>Remove All</div>
        </div>

    )} else { return (
        <div className={hideMenuState ? "item-menu hide" : "item-menu"} onMouseLeave={hideMenu}>
            <div className="item-unequip" onClick={() => unequipItem(item)}>Unequip</div>
        </div>
    )}
}

export default ItemMenu;
