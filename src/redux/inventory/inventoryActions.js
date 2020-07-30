import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM_COUNT } from './inventoryTypes';

export const addItem = (prevInv, item) => {
    const newInv = prevInv.slice();
    newInv.push(item);
    return {
        type: ADD_ITEM,
        newInv
    }
}

export const removeItem = item => {
    return {
        type: REMOVE_ITEM,
        item
    }
}

export const updateItemCount = itemCount => {
    return {
        type: UPDATE_ITEM_COUNT,
        itemCount
    }
}