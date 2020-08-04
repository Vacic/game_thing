import React, { Component } from 'react';
import { connect } from 'react-redux';
import chickenMeat from '../../img/chicken_meat.png';
import ItemDescription from './ItemDescription';
import ItemMenu from './ItemMenu';
import { updatePlayerStats, updatePlayerEquipment } from '../../redux/player/playerAction';
import { updateItemCount } from '../../redux';

class InventoryItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            hideDescription: true,
            hideMenu: true
        }

        this.invItemDiv = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.hideMenuOnOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.hideMenuOnOutsideClick);
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

    toggleMenu =(e) => {
        this.state.hideMenu ? this.setState({ hideMenu: false }) : this.setState({ hideMenu: true });
    }

    hideMenuOnOutsideClick = (e) => {
        if (this.invItemDiv && !this.invItemDiv.current.contains(e.target)) {
            this.hideMenu();
        }
    }

    equipItem = item => {
        let newPlayerEquip = {...this.props.playerEquip};
        newPlayerEquip[item.type] = newPlayerEquip[item.type] ? newPlayerEquip[item.type] : 'empty slot';
        console.log(newPlayerEquip[item.type])

        if (newPlayerEquip[item.type]==='empty slot' || item.name !== newPlayerEquip[item.type].name) {
            const itemKeyName = item.name.toLowerCase().replace(' ', '_')

            newPlayerEquip[item.type] = item;
            this.props.updatePlayerEquipment(newPlayerEquip);

            let newPlayerStats = {...this.props.playerStats};
            const itemStatKeys = Object.keys(item.stats);
            itemStatKeys.forEach(key => {
                newPlayerStats[key] = newPlayerStats[key] + item.stats[key];
            });
            this.props.updatePlayerStats(newPlayerStats);


            if (this.props.itemCount[itemKeyName] > 1) {
                let newItemCount = { ...this.props.itemCount };
                newItemCount[itemKeyName] = newItemCount[itemKeyName] - 1;
                this.props.updateItemCount(newItemCount);
            } else {
                let newItemCount = { ...this.props.itemCount };
                delete newItemCount[itemKeyName];
                this.props.updateItemCount(newItemCount);
            }

        } else {
            console.log(`You already have the ${item.name} equipped`)
        }
    }

    removeItem = () => {

    }

    render() {
        const { itemCount, itemList, handleUseItem, invItemName } = this.props;
        const item = itemList[invItemName];
        return (
            <div className="inv-item" onMouseEnter={this.showDescription} onMouseLeave={this.hideDescription} onClick={this.toggleMenu} ref={this.invItemDiv} >
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
        itemList: state.items,
        playerStats: state.player.stats,
        playerEquip: state.player.equipped
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePlayerStats: newPlayerStats => dispatch(updatePlayerStats(newPlayerStats)),
        updatePlayerEquipment: newPlayerEquip => dispatch(updatePlayerEquipment(newPlayerEquip)),
        updateItemCount: newItemCount => dispatch(updateItemCount(newItemCount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryItem);