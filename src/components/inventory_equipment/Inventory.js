import React from 'react';
import { connect } from 'react-redux';
import InventoryItem from './InventoryItem';
import { updateItemCount } from '../../redux';

function Inventory({ currentItems }) {
    const uniqueInvItems = currentItems.filter((value, i, self) => self.indexOf(value) === i);
    return (
        <div className="inventory">
            <h3>Inventory</h3>
            <div className="inv-list">
                {uniqueInvItems.map((invItem, i) => <InventoryItem key={i} invItem={invItem}/>)}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentItems: state.inventory.currentItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateItemCount: itemCount => dispatch(updateItemCount(itemCount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
