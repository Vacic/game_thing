import React from 'react';
import Inventory from './inventory_equipment/Inventory';
import Equipment from './inventory_equipment/Equipment';

function InvAndEquip() {
    return (
        <div className="inv-equip">
            <Equipment />
            <Inventory />
        </div>
    )
}

export default InvAndEquip;