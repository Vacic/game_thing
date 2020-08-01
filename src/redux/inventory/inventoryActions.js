import { UPDATE_ITEM_COUNT, REDUCE_SINGLE_ITEM_COUNT } from './inventoryTypes';

export const updateItemCount = itemCount => {
    return {
        type: UPDATE_ITEM_COUNT,
        itemCount
    }
}

export const reduceSingleItemCount = itemName => {
    return {
        type: REDUCE_SINGLE_ITEM_COUNT,
        itemName
    }
}