import { UPDATE_PLAYER_STATS, UPDATE_PLAYER_EQUIPMENT, UPDATE_PLAYER_QUICKBAR_EQUIPMENT, UPDATE_PLAYER_NAME, UPDATE_INVENTORY, REDUCE_SINGLE_ITEM } from "./playerTypes";

const playerState = {
    stats: {
        weapon: 'Fists',
        hp: 80,
        dmg: 5, //5
        attSpd: 1, //1
        def: 0,
        eva: 1
    },

    name: '',

    inventory: {},

    equipped: {},

    quickBarEquipment: ['', '', '']
}

const playerReducer = (state = playerState, action) => {
    switch(action.type) {
        case UPDATE_PLAYER_STATS: return {
            ...state,
            stats: action.newStats
        }

        case UPDATE_PLAYER_NAME: return {
            ...state,
            name: action.name
        }

        case UPDATE_PLAYER_EQUIPMENT: return {
            ...state,
            equipped: action.newEquip
        }

        case UPDATE_PLAYER_QUICKBAR_EQUIPMENT: return {
            ...state,
            quickBarEquipment: action.newQBEquip
        }

        case UPDATE_INVENTORY: return {
            ...state,
            inventory: action.inventory
        }

        case REDUCE_SINGLE_ITEM: return {
            ...state,
            inventory: {
                ...state.inventory,
                [action.itemName]: state.inventory[action.itemName] - 1
            }
        }

        default: return state;
    }
}

export default playerReducer;