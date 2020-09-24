import { HIDE_MESSAGE, REMOVE_NOTIFICATION, SET_MESSAGE, SET_NOTIFICATION } from "./notificationControlTypes";

export const setMessage = newMessage => ({
    type: SET_MESSAGE,
    newMessage
});

export const hideMessage = () => ({
    type: HIDE_MESSAGE
});

export const setNotification = newNotification => ({
    type: SET_NOTIFICATION,
    newNotification
});

export const removeNotification = () => ({
    type: REMOVE_NOTIFICATION
})