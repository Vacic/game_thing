import { UPDATE_ITEM_COUNT, REDUCE_SINGLE_ITEM_COUNT } from "./inventoryTypes";

const inventoryState = {
    itemCount: {}
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