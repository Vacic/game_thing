import React from 'react';
import { connect } from 'react-redux';
import PlayerCard from './PlayerCard';
import Stats from '../stats/Stats';
import AttackSpeed from '../stats/AttackSpeed';

const Player = (props) => {    
    const { weapon, hp, dmg, attSpd, def, eva } = props.playerStats;
    const { playerDiv, playerAttProgressDiv, playerHpBar, playerAttStatus } = props;  // DOM element refs
    const { currentPlayerHp, handleUseItem } = props;
    return (
        <div className="player" ref={playerDiv}>
            <PlayerCard currentHp={currentPlayerHp} maxHp={hp} playerHpBar={playerHpBar} playerAttStatus = {playerAttStatus} handleUseItem={handleUseItem} />
            <AttackSpeed attSpd={attSpd} playerAttProgressDiv={playerAttProgressDiv} weapon={weapon} />
            <Stats dmg={dmg} def={def} eva={eva} />
        </div>
    )
}

const mapStateToProps = state => {
	return {
        currentPlayerHp: state.gameData.currentPlayerHp,
        playerStats: state.player.stats
	}
}

export default connect(mapStateToProps)(Player);