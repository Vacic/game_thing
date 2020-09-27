import React from 'react';
import pluralize from 'pluralize';
import { Fragment } from 'react';

const ItemMenu = ({ item, hideMenuState, hideMenu, handleUseItem, equipItem, removeAllItems, removeItem, unequipItem, equipToQuickSlot, hideDescription, showModal }) =>
    <div className={ hideMenuState ? "item-menu hide" : "item-menu" } onMouseLeave={ hideMenu } onClick={ hideDescription }>
        {!unequipItem ? item.stats.heal ?
            <Fragment>
                <div className="item-use" onClick={ () => {handleUseItem(item)} }>Use</div>
                <div className="item-equip" onClick={ () => equipToQuickSlot(item) }>Equip</div>
                <div className="item-remove" onClick={ () => showModal(`Are you sure you want to remove all of your ${item.name.match(/Meat/g) ? item.name : pluralize(item.name)}`, removeAllItems, item) }>Remove All</div>
            </Fragment>
            :
            <Fragment>
                <div className="item-equip" onClick={ () => equipItem(item) }>Equip</div>
                <div className="item-remove" onClick={ () => showModal(`Are you sure you want to remove 1 of your ${item.name}`, removeItem, item) }>Remove 1</div>
                <div className="item-remove" onClick={ () => showModal(`Are you sure you want to remove all of your ${pluralize(item.name)}`, removeAllItems, item) }>Remove All</div>
            </Fragment>
            : <div className="item-unequip" onClick={ () => unequipItem(item) }>Unequip</div>
        }
    </div>

export default ItemMenu;
