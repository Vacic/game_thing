import React from 'react';
import { connect } from 'react-redux';
import InventoryItem from './InventoryItem';

function Inventory({ inventory }) {
    return (
        <div className="inventory">
            <h3>Inventory</h3>
            <div className="inv-list">
                {inventory.map(invItem => <InventoryItem key={invItem} invItem={invItem}/>)}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        inventory: state.inventory.currentItems
    }
}

export default connect(mapStateToProps)(Inventory);
