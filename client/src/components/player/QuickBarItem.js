import React from 'react';


function QuickBarItem({ item, itemCount, handleUseItem }) {
    return (
        <div className="heal-quick-bar-item" onClick={() => item && handleUseItem(item)}>
            <div className="item-img">
                {item && <img src={item.img} alt=""/>}
            </div>
            <span className="item-num">{itemCount}</span>
        </div>
    )
}

export default QuickBarItem
