import { UPDATE_ITEM_COUNT, REDUCE_SINGLE_ITEM_COUNT } from "./inventoryTypes";

const inventoryState = {
    itemCount: {
        bronze_sword: 1,
        iron_sword: 1,
        steel_sword: 1,
        diamond_sword: 1,
        wooden_shield: 1,
        bronze_shield: 1,
        iron_shield: 1,
        steel_shield: 1,
        diamond_shield: 1,
        first_aid_kit: 1
    }
}

const inventoryReducer = (state = inventoryState, action) => {
    
    switch(action.type) {
        case UPDATE_ITEM_COUNT: return {
            ...state,
            itemCount: action.itemCount
        }

        case REDUCE_SINGLE_ITEM_COUNT: return {
            ...state,
            itemCount: state.itemCount[action.itemName] - 1
        }

        default: return state;
    }
}

export default inventoryReducer;