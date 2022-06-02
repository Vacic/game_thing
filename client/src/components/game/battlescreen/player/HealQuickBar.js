import React from "react";
import { connect } from "react-redux";
import QuickBarItem from "./QuickBarItem";

const HealQuickBar = ({
  quickBarEquipment,
  itemList,
  inventory,
  handleUseItem,
}) => (
  <div className="heal-quick-bar">
    <div className="heal-quick-bar-container">
      {quickBarEquipment.map((itemName, i) =>
        itemName !== "" ? (
          <QuickBarItem
            key={i}
            item={itemList[itemName]}
            itemCount={inventory[itemName]}
            handleUseItem={handleUseItem}
          />
        ) : (
          <QuickBarItem key={i} />
        )
      )}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  quickBarEquipment: state.player.quickBarEquipment,
  itemList: state.items,
  inventory: state.player.inventory,
});

export default connect(mapStateToProps)(HealQuickBar);
