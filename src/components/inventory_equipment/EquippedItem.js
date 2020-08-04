import React from 'react';
import chicken from '../../img/chicken_meat.png';
import ItemDescription from './ItemDescription';

function EquippedItem({ item }) {
    const { img, name } = item;
    const { dmg, def, eva, attSpd, hp } = item.stats
    return (
        <div>
            <img src={img||chicken} alt=""/>
            <ItemDescription item={item} />
        </div>
    )
}

export default EquippedItem;