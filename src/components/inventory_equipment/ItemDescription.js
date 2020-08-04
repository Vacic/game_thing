import React from 'react';
import { connect } from 'react-redux';

function ItemDescription({ item, hideDescriptionState, hideDescription, playerStats }) {
    const {heal, hp, def, eva, dmg, attSpd} = item.stats;
    const name = item.name;
    return (
        <div className={hideDescriptionState ? "item-description hide" : "item-description"} onMouseEnter={hideDescription}>
            <p className="item-name">{name}</p>
            <div className='item-stats'>
                {heal && <p>Heal Amount: <span>{heal}</span></p>}
                {hp && <p>Bonus Health: <span>{hp}</span></p>}
                {def && <p>Defense: <span>{def}</span></p>}
                {eva && <p>Evasion: <span>{eva}</span></p>}
                {dmg && <p>Damage: <span>{dmg}</span></p>}
                {attSpd && <p>Attack Speed: <span>{attSpd+1}</span></p>}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        playerStats: state.player.stats
    }
}

export default connect(mapStateToProps)(ItemDescription);