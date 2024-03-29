import {
  UPDATE_PLAYER_STATS,
  UPDATE_PLAYER_EQUIPMENT,
  UPDATE_PLAYER_QUICKBAR_EQUIPMENT,
  UPDATE_USER,
  UPDATE_INVENTORY,
  REDUCE_SINGLE_ITEM,
} from "./playerTypes";

const playerState = {
  user: {
    username: "",
    email: "",
    dateCreated: "",
  },

  stats: {
    weapon: "Fists",
    hp: 80, //80
    dmg: 5, //5
    attSpd: 1, //1
    def: 0, //0
    eva: 1, //1
  },

  inventory: {},

  equipped: {},

  quickBarEquipment: ["", "", ""],
};

const playerReducer = (state = playerState, action) => {
  switch (action.type) {
    case UPDATE_PLAYER_STATS:
      return {
        ...state,
        stats: action.newStats,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };

    case UPDATE_PLAYER_EQUIPMENT:
      return {
        ...state,
        equipped: action.newEquip,
      };

    case UPDATE_PLAYER_QUICKBAR_EQUIPMENT:
      return {
        ...state,
        quickBarEquipment: action.newQBEquip,
      };

    case UPDATE_INVENTORY:
      return {
        ...state,
        inventory: action.inventory,
      };

    case REDUCE_SINGLE_ITEM:
      return {
        ...state,
        inventory: {
          ...state.inventory,
          [action.itemName]: state.inventory[action.itemName] - 1,
        },
      };

    default:
      return state;
  }
};

export default playerReducer;
