import React from 'react';

function ItemMenu({ item, hideMenuState, hideMenu, handleUseItem, equipItem, removeItem }) {
    return (
        <div className={hideMenuState ? "item-menu hide" : "item-menu"} onMouseLeave={hideMenu}>
            {item.stats.heal ? <div className="item-use" onClick={() => {handleUseItem(item)}}>Use</div> : <div className="item-equip" onClick={() => equipItem(item)}>Equip</div>}
            <div className="item-remove" onClick={removeItem}>Remove</div>
        </div>
    )
}

export default ItemMenu;
