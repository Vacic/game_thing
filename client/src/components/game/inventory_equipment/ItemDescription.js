import React from "react";

const ItemDescription = ({
  item: {
    stats: { heal, hp, def, eva, dmg, attSpd },
    name,
  },
  hideDescriptionState,
  hideDescription,
}) => (
  <div
    className={
      hideDescriptionState ? "item-description hide" : "item-description"
    }
    onMouseEnter={hideDescription}
  >
    <p className="item-name">{name}</p>
    <div className="item-stats">
      {heal && (
        <p>
          Heal Amount: <span>{heal}</span>
        </p>
      )}
      {hp && (
        <p>
          Bonus Health: <span>{hp}</span>
        </p>
      )}
      {def && (
        <p>
          Defense: <span>{def}</span>
        </p>
      )}
      {eva && (
        <p>
          Evasion: <span>{eva}</span>
        </p>
      )}
      {dmg && (
        <p>
          Damage: <span>{dmg}</span>
        </p>
      )}
      {attSpd && (
        <p>
          Attack Speed: <span>{attSpd}</span>
        </p>
      )}
    </div>
  </div>
);

export default ItemDescription;
