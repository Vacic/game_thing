import { SET_MESSAGE, HIDE_MESSAGE } from "./notificationControlTypes";

const notificationState = {
    message: {
        showMsg: false,
        msg: '',
        classType: 'success'
    }
}

const notificationReducer = (state = notificationState, action) => {
    switch(action.type) {
        
        case SET_MESSAGE: 
        action.newMessage.showMsg = action.newMessage.showMsg ?? true;
        action.newMessage.classType = action.newMessage.classType ?? 'success';
        return {
            ...state,
            message: action.newMessage
        }

        case HIDE_MESSAGE: return {
            ...state,
            message: {
                ...state.message,
                showMsg: false
            }
        }

        default: return state;
    }
}

export default notificationReducer;