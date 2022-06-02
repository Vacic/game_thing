import React from "react";
import { connect } from "react-redux";
import EquippedItem from "./EquippedItem";

const Equipment = ({
  equipment: { helmet, weapon, armor, shield, pants, boots },
  unequipItem,
}) => (
  <div className="equipment">
    <h3>Equipment</h3>
    <div className="equipment-slots">
      <div className="helmet">
        {helmet && <EquippedItem item={helmet} unequipItem={unequipItem} />}
      </div>
      <div className="weapon">
        {weapon && <EquippedItem item={weapon} unequipItem={unequipItem} />}
      </div>
      <div className="armor">
        {armor && <EquippedItem item={armor} unequipItem={unequipItem} />}
      </div>
      <div className="shield">
        {shield && <EquippedItem item={shield} unequipItem={unequipItem} />}
      </div>
      <div className="pants">
        {pants && <EquippedItem item={pants} unequipItem={unequipItem} />}
      </div>
      <div className="boots">
        {boots && <EquippedItem item={boots} unequipItem={unequipItem} />}
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  equipment: state.player.equipped,
});

export default connect(mapStateToProps)(Equipment);
