import React, { Component } from 'react';
import { connect } from 'react-redux';
import chickenMeat from '../../img/chicken_meat.png';
import ItemDescription from './ItemDescription';
import ItemMenu from './ItemMenu';

class InventoryItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            hideDescription: true,
            hideMenu: true
        }
    }
    
    showDescription = () => {
        this.setState({ hideDescription: false });
    }

    hideDescription = () => {
        this.setState({ hideDescription: true });
    }

    hideMenu = () => {  // Need it for 'onMouseLeave' event in ItemMenu
        this.setState({ hideMenu: true });
    }

    toggleMenu =() => {
        this.state.hideMenu === true ? this.setState({ hideMenu: false }) : this.setState({ hideMenu: true });
    }

    equipItem = () => {

    }

    removeItem = () => {

    }

    render() {
        const { itemCount, itemList, handleUseItem, invItemName } = this.props;
        const item = itemList[invItemName];
        return (
            <div className="inv-item" onMouseEnter={this.showDescription} onMouseLeave={this.hideDescription} onClick={this.toggleMenu} >
                <img src={item.img ? item.img : chickenMeat} alt=""/>
                <div className="item-count">{itemCount[invItemName]}</div>

                <ItemMenu 
                    hideMenuState={this.state.hideMenu} 
                    hideMenu={this.hideMenu} 
                    hideDescription={this.hideDescription}
                    item={item}
                    handleUseItem={handleUseItem}
                    equipItem={this.equipItem}
                    removeItem={this.removeItem}
                />

                <ItemDescription 
                    item={item}
                    hideDescriptionState={this.state.hideDescription}
                    hideDescription={this.hideDescription}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        itemCount: state.inventory.itemCount,
        itemList: state.items
    }
}

export default connect(mapStateToProps)(InventoryItem);