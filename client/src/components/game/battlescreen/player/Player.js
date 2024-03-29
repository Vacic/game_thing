import React from "react";
import { connect } from "react-redux";
import PlayerCard from "./PlayerCard";
import Stats from "../stats/Stats";
import AttackSpeed from "../stats/AttackSpeed";

const Player = (props) => {
  const playerName = props.player.user.username;
  const { weapon, hp, dmg, attSpd, def, eva } = props.player.stats;
  const { playerDiv, playerAttProgressDiv, playerHpBar, playerAttStatus } =
    props; // DOM element refs
  const { currentPlayerHp, handleUseItem } = props;
  return (
    <div className="player" ref={playerDiv}>
      <PlayerCard
        currentHp={currentPlayerHp}
        maxHp={hp}
        playerName={playerName}
        playerHpBar={playerHpBar}
        playerAttStatus={playerAttStatus}
        handleUseItem={handleUseItem}
      />
      <AttackSpeed
        attSpd={attSpd}
        playerAttProgressDiv={playerAttProgressDiv}
        weapon={weapon}
      />
      <Stats dmg={dmg} def={def} eva={eva} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentPlayerHp: state.gameData.currentPlayerHp,
  player: state.player,
});

export default connect(mapStateToProps)(Player);
