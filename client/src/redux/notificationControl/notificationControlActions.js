import { SET_MESSAGE } from "./notificationControlTypes";

export const setMessage = newMessage => ({
    type: SET_MESSAGE,
    newMessage
});