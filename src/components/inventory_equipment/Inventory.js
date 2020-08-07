import React from 'react';
import { connect } from 'react-redux';
import InventoryItem from './InventoryItem';

function Inventory({ itemCount, handleUseItem, equipItem }) {
    const InvItemNames = Object.keys(itemCount);
    return (
        <div className="inventory">
            <h3>Inventory</h3>
            <div className="inv-list">
                {InvItemNames.map((itemName, i) => <InventoryItem key={i} itemName={itemName} handleUseItem={handleUseItem} equipItem={equipItem} />)}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        itemCount: state.inventory.itemCount
    }
}

export default connect(mapStateToProps)(Inventory);
