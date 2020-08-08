import React from 'react';
import { connect } from 'react-redux';
import QuickBarItem from './QuickBarItem';

function HealQuickBar({ quickBarEquipment, itemList, itemCount, handleUseItem }) {
    return (
        <div className="heal-quick-bar">
            <div className="heal-quick-bar-container">
                {quickBarEquipment.map((itemName, i) => {
                    
                    if (itemName!=='') return <QuickBarItem key={i} item={itemList[itemName]} itemCount={itemCount[itemName]} handleUseItem={handleUseItem} />
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
        itemCount: state.inventory.itemCount
    }
}

export default connect(mapStateToProps)(HealQuickBar)