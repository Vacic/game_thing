import React, { useEffect, useState } from "react";
import HpBar from "../stats/HpBar";
import HealQuickBar from "./HealQuickBar";

const PlayerCard = ({
  currentHp,
  maxHp,
  playerHpBar,
  playerAttStatus,
  handleUseItem,
  playerName,
}) => {
  const [guestName, setGuestName] = useState("");
  useEffect(() => {
    if (guestName === "") {
      let number = "";
      for (let i = 0; i < 8; i++) {
        number += Math.round(Math.random() * 10);
      }
      setGuestName(`Guest_${number}`);
    }
  }, [guestName]);

  return (
    <div className="player-card">
      <p className="name">{playerName ? playerName : guestName}</p>
      <HpBar
        currentHp={currentHp}
        maxHp={maxHp}
        playerHpBar={playerHpBar}
        playerAttStatus={playerAttStatus}
      />
      <img
        className="player-img"
        src="https://via.placeholder.com/150"
        alt=""
      />
      <HealQuickBar handleUseItem={handleUseItem} />
    </div>
  );
};

export default PlayerCard;
