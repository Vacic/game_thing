import React from "react";

const QuickBarItem = ({ item, itemCount, handleUseItem }) => (
  <div
    className="heal-quick-bar-item"
    onClick={() => item && handleUseItem(item)}
  >
    <div className="item-img">{item && <img src={item.img} alt="" />}</div>
    <span className="item-num">{itemCount}</span>
  </div>
);

export default QuickBarItem;
