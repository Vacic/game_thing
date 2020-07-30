import React, { Component } from 'react';
import { connect } from 'react-redux';
import chickenMeat from '../../img/chicken_meat.png';
import ItemDescription from './ItemDescription';

class InventoryItem extends Component {
    showDescription = () => {
        this.itemDescriptionDiv.style.visibility = "visible";
    }

    hideDescription = (e) => {
        this.itemDescriptionDiv.style.visibility = "hidden";
    }

    render() {
        return (
            <div className="inv-item" onMouseEnter={this.showDescription} onMouseLeave={this.hideDescription}>
                <img src={chickenMeat} alt=""/>
                <div className="item-count">{this.props.itemCount[this.props.invItem]}</div>
                <ItemDescription itemName={this.props.invItem} itemDescriptionDiv={el => this.itemDescriptionDiv = el} hideDescription={this.hideDescription} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        itemCount: state.inventory.itemCount,
    }
}

export default connect(mapStateToProps)(InventoryItem)