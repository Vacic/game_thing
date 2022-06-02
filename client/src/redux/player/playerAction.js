import axios from "axios";
import Cookies from "universal-cookie";
import { setLoading } from "../gameData/gameDataActions";
import {
  setMessage,
  setNotification,
} from "../notificationControl/notificationControlActions";
import {
  UPDATE_PLAYER_EQUIPMENT,
  UPDATE_PLAYER_STATS,
  UPDATE_PLAYER_QUICKBAR_EQUIPMENT,
  UPDATE_USER,
  UPDATE_INVENTORY,
  REDUCE_SINGLE_ITEM,
} from "./playerTypes";
const cookies = new Cookies();

export const populatePlayer =
  ({ playerStats, equipment, quickBarEquipment, inventory }) =>
  async (dispatch) => {
    dispatch(updatePlayerEquipment(equipment));
    dispatch(updatePlayerStats(playerStats));
    dispatch(updatePlayerQuickBarEquipment(quickBarEquipment));
    dispatch(updateInventory(inventory));
  };

export const populateUser = () => async (dispatch) => {
  setLoading(true);
  try {
    // FOR LOCAL DEV TOKEN
    // const { data } = await axios.get("http://localhost:3001/users/user", {
    //   headers: { token: localStorage.getItem("token") },
    // });
    const { data } = await axios.get("/users/user", { withCredentials: true });
    dispatch(updateUser(data.user));
  } catch (err) {
    cookies.remove("loggedIn");
    dispatch(setNotification({ msg: `User Not Found`, classType: "danger" }));
    if (err.response && err.response.data.error) {
      dispatch(setLoading(false));
      dispatch(
        setMessage({ msg: err.response.data.error, classType: "danger" })
      );
    } else {
      console.log(err.response.statusText);
      dispatch(setLoading(false));
      dispatch(
        setMessage({ msg: "Internal Server Error", classType: "danger" })
      );
    }
  }
};

export const updatePlayerEquipment = (newEquip) => ({
  type: UPDATE_PLAYER_EQUIPMENT,
  newEquip,
});

export const updatePlayerStats = (newStats) => ({
  type: UPDATE_PLAYER_STATS,
  newStats,
});

export const updatePlayerQuickBarEquipment = (newQBEquip) => ({
  type: UPDATE_PLAYER_QUICKBAR_EQUIPMENT,
  newQBEquip,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

export const updateInventory = (inventory) => ({
  type: UPDATE_INVENTORY,
  inventory,
});

export const reduceSingleItem = (itemName) => ({
  type: REDUCE_SINGLE_ITEM,
  itemName,
});
