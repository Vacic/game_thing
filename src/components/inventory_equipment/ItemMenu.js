import React from 'react';

function ItemMenu({ item, hideMenuState, hideMenu, hideDescription, handleUseItem, equipItem, removeItem }) {
    return (
        <div className={hideMenuState ? "item-menu hide" : "item-menu"} onMouseEnter={hideDescription} onMouseLeave={hideMenu}>
            {item.heal ? <div className="item-use" onClick={() => {handleUseItem(item)}}>Use</div> : <div className="item-equip" onClick={equipItem}>Equip</div>}
            <div className="item-remove" onClick={removeItem}>Remove</div>
        </div>
    )
}

export default ItemMenu;
