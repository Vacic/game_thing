import { SET_MESSAGE, HIDE_MESSAGE, SET_NOTIFICATION, REMOVE_NOTIFICATION } from "./notificationControlTypes";

const notificationState = {
    message: {
        showMsg: false,
        msg: '',
        classType: ''
    },

    notifications: [], // {img, msg, classType}

    modul: {

    }
}

const notificationReducer = (state = notificationState, action) => {
    switch(action.type) {
        
        case SET_MESSAGE: 
        action.newMessage.showMsg = action.newMessage.showMsg ?? true;
        action.newMessage.classType = action.newMessage.classType ?? 'success';
        action.newMessage.msg = action.newMessage.msg ?? '';
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

        case SET_NOTIFICATION: 
        action.newNotification.showNotif = action.newNotification.showNotif ?? true;
        action.newNotification.img = action.newNotification.img ?? null;
        action.newNotification.classType = action.newNotification.classType ?? 'primary';
        action.newNotification.msg = action.newNotification.msg ?? '';
        return {
            ...state,
            notifications: [ ...state.notifications, action.newNotification ]
        }

        case REMOVE_NOTIFICATION: return {
            ...state,
            notifications: !state.notifications.length == 1  ? [ state.notifications.shift() ] : []
        }

        default: return state;
    }
}

export default notificationReducer;