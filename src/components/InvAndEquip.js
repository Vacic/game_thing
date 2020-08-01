import React from 'react';
import Inventory from './inventory_equipment/Inventory';
import Equipment from './inventory_equipment/Equipment';

function InvAndEquip({ handleUseItem }) {
    return (
        <div className="inv-equip">
            <Equipment />
            <Inventory handleUseItem={handleUseItem} />
        </div>
    )
}

export default InvAndEquip;