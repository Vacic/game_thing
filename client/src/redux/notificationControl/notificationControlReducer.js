import {
  SET_MESSAGE,
  HIDE_MESSAGE,
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
  SET_MODAL,
  TOGGLE_MODAL,
  TOGGLE_INFORMATION_MODAL,
} from "./notificationControlTypes";

const notificationState = {
  message: {
    showMsg: false,
    msg: "",
    classType: "",
  },

  notifications: [], // { img, msg, classType}

  modal: {
    text: "",
    showModal: false,
    showInformationModal: false,
    function: () => {},
    itemToRemove: null,
    history: null,
    redirectDelay: 0,
  },
};

const notificationReducer = (state = notificationState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      action.newMessage.showMsg = action.newMessage.showMsg ?? true;
      action.newMessage.classType = action.newMessage.classType ?? "success";
      action.newMessage.msg = action.newMessage.msg ?? "";
      return {
        ...state,
        message: action.newMessage,
      };

    case HIDE_MESSAGE:
      return {
        ...state,
        message: {
          ...state.message,
          showMsg: false,
        },
      };

    case SET_NOTIFICATION:
      action.newNotification.showNotif =
        action.newNotification.showNotif ?? true;
      action.newNotification.img = action.newNotification.img ?? null;
      action.newNotification.classType =
        action.newNotification.classType ?? "primary";
      action.newNotification.msg = action.newNotification.msg ?? "";
      return {
        ...state,
        notifications: [...state.notifications, action.newNotification],
      };

    case REMOVE_NOTIFICATION:
      let notifications = [...state.notifications];
      notifications.shift();
      return {
        ...state,
        notifications: [...notifications],
      };

    case SET_MODAL:
      action.newModal.showModal = action.newModal.showModal ?? true;
      action.newModal.text = action.newModal.text ?? "";
      action.newModal.func = action.newModal.func ?? null;
      action.newModal.itemToRemove = action.newModal.itemToRemove ?? null;
      action.newModal.history = action.newModal.history ?? null;
      action.newModal.redirectTo = action.newModal.redirectTo ?? null;
      action.newModal.redirectDelay = action.newModal.redirectDelay ?? null;
      return {
        ...state,
        modal: action.newModal,
      };

    case TOGGLE_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          showModal: action.payload,
        },
      };

    case TOGGLE_INFORMATION_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          showInformationModal: action.payload,
        },
      };

    default:
      return state;
  }
};

export default notificationReducer;
