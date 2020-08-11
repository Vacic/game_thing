import React from 'react';
import { connect } from 'react-redux';
import InventoryItem from './InventoryItem';

function Inventory({ itemCount, handleUseItem, equipItem, equipToQuickSlot, removeItem, removeAllItems, showModal }) {
    const invItemNames = Object.keys(itemCount);
    return (
        <div className="inventory">
            <h3>Inventory</h3>
            <div className="inv-list">
                {invItemNames.map((itemName, i) => <InventoryItem
                    key={i} 
                    id={i}
                    itemName={itemName} 
                    handleUseItem={handleUseItem} 
                    equipItem={equipItem} 
                    equipToQuickSlot={equipToQuickSlot} 
                    removeItem={removeItem} 
                    removeAllItems={removeAllItems} 
                    showModal={showModal}
                />)}
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
