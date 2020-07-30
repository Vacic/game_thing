import { ADD_ITEM, UPDATE_ITEM_COUNT } from "./inventoryTypes";

const inventoryState = {
    currentItems: [],
    itemCount: {}
}

const inventoryReducer = (state = inventoryState, action) => {
    
    switch(action.type) {
        case ADD_ITEM: return {
            ...state,
            currentItems: action.newInv
        }

        case UPDATE_ITEM_COUNT: return {
            ...state,
            itemCount: action.itemCount
        }

        default: return state;
    }
}

export default inventoryReducer;