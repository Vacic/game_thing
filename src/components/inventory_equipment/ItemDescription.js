import React from 'react';
import { connect } from 'react-redux';

function ItemDescription({ itemList, itemName, itemDescriptionDiv, hideDescription }) {
    const itemObj = itemList[itemName.toLowerCase().replace(' ', '_')]
    return (
        <div className="item-description" ref={itemDescriptionDiv} onMouseEnter={hideDescription}>
            <p className="item-name">{itemObj.name}</p>
            <div className='item-stats'>
                {itemObj.heal && <p>Heal Amount: <span>{itemObj.heal}</span></p>}
                {itemObj.def && <p>Defense: <span>{itemObj.def}</span></p>}
                {itemObj.eva && <p>Evasion: <span>{itemObj.eva}</span></p>}
                {itemObj.dmg && <p>Damage: <span>{itemObj.dmg}</span></p>}
                {itemObj.attSpd && <p>Attack Speed: <span>{itemObj.attSpd}</span></p>}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        itemList: state.items
    }
}

export default connect(mapStateToProps)(ItemDescription)
