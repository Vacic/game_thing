import {
  HIDE_MESSAGE,
  REMOVE_NOTIFICATION,
  SET_MESSAGE,
  SET_NOTIFICATION,
  REMOVE_ALL_NOTIFICATIONS,
  TOGGLE_MODAL,
  SET_MODAL,
  TOGGLE_INFORMATION_MODAL,
} from "./notificationControlTypes";

export const setMessage = (newMessage) => ({
  type: SET_MESSAGE,
  newMessage,
});

export const hideMessage = () => ({
  type: HIDE_MESSAGE,
});

export const setNotification = (newNotification) => ({
  type: SET_NOTIFICATION,
  newNotification,
});

export const removeNotification = (id) => ({
  type: REMOVE_NOTIFICATION,
  id,
});

export const removeAllNotifications = () => ({
  type: REMOVE_ALL_NOTIFICATIONS,
});

export const setModal = (newModal) => ({
  type: SET_MODAL,
  newModal,
});

export const toggleModal = (isShown) => ({
  type: TOGGLE_MODAL,
  payload: isShown,
});

export const toggleInformationModal = (isShown) => ({
  type: TOGGLE_INFORMATION_MODAL,
  payload: isShown,
});
