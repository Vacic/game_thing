import React from "react";
import chicken from "../../../../img/chicken_meat.png";
import ItemDescription from "../ItemDescription";
import ItemMenu from "../ItemMenu";
import hideShowDescriptionMenu from "../hideShowDescriptionMenu";

const EquippedItem = ({
  item,
  unequipItem,
  hideMenuState,
  hideDescriptionState,
  showDescription,
  hideDescription,
  toggleMenu,
  hideMenu,
  itemDiv,
}) => (
  <div
    className="equipped-item"
    onMouseEnter={showDescription}
    onMouseLeave={hideDescription}
    onClick={toggleMenu}
    ref={itemDiv}
  >
    <img src={item.img || chicken} alt="" />
    <ItemMenu
      hideMenuState={hideMenuState}
      hideMenu={hideMenu}
      hideDescription={hideDescription}
      item={item}
      unequipItem={unequipItem}
    />

    <ItemDescription
      item={item}
      hideDescriptionState={hideDescriptionState}
      hideDescription={hideDescription}
    />
  </div>
);

export default hideShowDescriptionMenu(EquippedItem);
