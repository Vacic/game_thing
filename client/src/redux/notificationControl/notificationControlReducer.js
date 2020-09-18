import { SET_MESSAGE } from "./notificationControlTypes";

const notificationState = {
    message: {
        showMsg: false,
        msg: '',
        classType: 'success'
    }
}

const notificationReducer = (state = notificationState, action) => {
    switch(action.type) {
        
        case SET_MESSAGE: return {
            ...state,
            message: action.newMessage
        }

        default: return state;
    }
}

export default notificationReducer;