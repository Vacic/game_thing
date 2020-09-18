import React from 'react';
import { connect } from 'react-redux';
import QuickBarItem from './QuickBarItem';

function HealQuickBar({ quickBarEquipment, itemList, inventory, handleUseItem }) {
    return (
        <div className="heal-quick-bar">
            <div className="heal-quick-bar-container">
                {quickBarEquipment.map((itemName, i) => {
                    
                    if (itemName!=='') return <QuickBarItem key={i} item={itemList[itemName]} itemCount={inventory[itemName]} handleUseItem={handleUseItem} />
                    else return <QuickBarItem key={i} />
                }
                )}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        quickBarEquipment: state.player.quickBarEquipment,
        itemList: state.items,
        inventory: state.player.inventory
    }
}

export default connect(mapStateToProps)(HealQuickBar)