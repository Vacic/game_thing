import React from 'react';
import chicken from '../../img/chicken_meat.png';
import ItemDescription from './ItemDescription';
import ItemMenu from './ItemMenu';
import hideShowDescriptionMenu from './hideShowDescriptionMenu';

function EquippedItem(props) {
    const { item, unequipItem } = props;
    const img = item.img;
    const { hideMenuState, hideDescriptionState, showDescription, hideDescription, toggleMenu, hideMenu, itemDiv } = props; // From HOC
    return (
        <div className="equipped-item" onMouseEnter={showDescription} onMouseLeave={hideDescription} onClick={toggleMenu} ref={itemDiv}>
            <img src={img||chicken} alt=""/>
                <ItemMenu 
                    hideMenuState={hideMenuState} 
                    hideMenu={hideMenu} 
                    hideDescription={hideDescription}
                    item={item}
                    unequipItem={unequipItem}
                />

                <ItemDescription 
                    item={item}
                    hideDescriptionState={hideDescriptionState}
                    hideDescription={hideDescription}
                />
        </div>
    )
}

export default hideShowDescriptionMenu(EquippedItem);