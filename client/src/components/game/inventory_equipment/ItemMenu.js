import React from "react";
import pluralize from "pluralize";
import { connect } from "react-redux";
import { Fragment } from "react";
import { setModal } from "../../../redux";

const ItemMenu = ({
  item,
  hideMenuState,
  hideMenu,
  handleUseItem,
  equipItem,
  removeAllItems,
  removeItem,
  unequipItem,
  equipToQuickSlot,
  hideDescription,
  setModal,
}) => (
  <div
    className={hideMenuState ? "item-menu hide" : "item-menu"}
    onMouseLeave={hideMenu}
    onClick={hideDescription}
  >
    {!unequipItem ? (
      item.stats.heal ? (
        <Fragment>
          <div
            className="item-use"
            onClick={() => {
              handleUseItem(item);
            }}
          >
            Use
          </div>
          <div className="item-equip" onClick={() => equipToQuickSlot(item)}>
            Equip
          </div>
          <div
            className="item-remove"
            onClick={() =>
              setModal({
                text: `Are you sure you want to remove all of your ${
                  item.name.match(/Meat/g) ? item.name : pluralize(item.name)
                }`,
                func: removeAllItems,
                itemToRemove: item,
              })
            }
          >
            Remove All
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="item-equip" onClick={() => equipItem(item)}>
            Equip
          </div>
          <div
            className="item-remove"
            onClick={() =>
              setModal({
                text: `Are you sure you want to remove 1 of your ${item.name}`,
                func: removeItem,
                itemToRemove: item,
              })
            }
          >
            Remove 1
          </div>
          <div
            className="item-remove"
            onClick={() =>
              setModal({
                text: `Are you sure you want to remove all of your ${pluralize(
                  item.name
                )}`,
                func: removeAllItems,
                itemToRemove: item,
              })
            }
          >
            Remove All
          </div>
        </Fragment>
      )
    ) : (
      <div className="item-unequip" onClick={() => unequipItem(item)}>
        Unequip
      </div>
    )}
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  setModal: (newModal) => dispatch(setModal(newModal)),
});

export default connect(null, mapDispatchToProps)(ItemMenu);
