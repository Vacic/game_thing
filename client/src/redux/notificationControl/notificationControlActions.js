import { HIDE_MESSAGE, SET_MESSAGE } from "./notificationControlTypes";

export const setMessage = newMessage => ({
    type: SET_MESSAGE,
    newMessage
});

export const hideMessage = () => ({
    type: HIDE_MESSAGE
});