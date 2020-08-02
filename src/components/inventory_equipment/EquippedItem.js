import React from 'react';
import chicken from '../../img/chicken_meat.png';

function EquippedItem({ item }) {
    const { img, name } = item;
    const { dmg, def, eva, attSpd, hp } = item.stats
    return (
        <div>
            <img src={img||chicken} alt=""/>
        </div>
    )
}

export default EquippedItem;