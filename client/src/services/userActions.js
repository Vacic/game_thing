import axios from "axios";
import Cookies from "universal-cookie";
import {
  logout,
  populatePlayer,
  setCurrentEnemyHp,
  setCurrentEnemyStats,
  setCurrentLocation,
  setCurrentPlayerHp,
  setMessage,
  updateUser,
  setLogin,
  setLoading,
  setNotification,
} from "../redux";
import store from "../redux/store";
import { setLocalStorage } from "./setLocalStorage";
import { updateDbProgress } from "./updateDbProgress";

const cookies = new Cookies();
const dispatch = store.dispatch;

export const checkToken = async (history) => {
  if (cookies.get("loggedIn")) {
    try {
      // const res = await axios.get('http://localhost:3001/auth/check-token', { headers: { token: localStorage.getItem('token')} });
      // res.data !== '' && localStorage.setItem('token', res.data)
      await axios.get("/auth/check-token", { withCredentials: true });
      return true;
    } catch (err) {
      if (err.response && err.response.status === 403) {
        dispatch(
          setMessage({ msg: "Please Login To Continue", classType: "danger" })
        );
        dispatch(logout());
        cookies.remove("loggedIn");
        return history.push("/login");
      } else if (err.response && err.response.data.error) {
        console.log(err.response.data.error);
        return { error: err.response.data.error };
      } else {
        console.log(err);
        console.log("Internal Server Error");
      }
    }
  }
};

export const editProfile = async (formData) => {
  const data = { ...formData };
  const body = JSON.stringify(data);
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const { data } = await axios.put("/users/update-user", body, config, {
      withCredentials: true,
    });
    // const { data } = await axios.put('http://localhost:3001/users/update-user', body, { headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') } } );
    dispatch(updateUser(data));
    dispatch(setMessage({ msg: "Successfully Updated Your Profile" }));
    return true;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error)
      dispatch(
        setMessage({ msg: err.response.data.error, classType: "danger" })
      );
    else {
      console.log(err);
      dispatch(
        setMessage({ msg: "Internal Server Error", classType: "danger" })
      );
    }
  }
};

export const register = async (formData) => {
  const localProgress = localStorage.progress
    ? JSON.parse(localStorage.getItem("progress"))
    : {};
  const data = { ...formData, ...localProgress };
  const body = JSON.stringify(data);
  try {
    await axios.post("/users/register", body, {
      headers: { "Content-Type": "application/json" },
    });
    // await axios.post('http://localhost:3001/users/register', body, { headers: { 'Content-Type': 'application/json' } });
    dispatch(setMessage({ msg: "Successfully Registered" }));
    return true;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error)
      dispatch(
        setMessage({ msg: err.response.data.error, classType: "danger" })
      );
    else {
      console.log(err);
      dispatch(
        setMessage({ msg: "Internal Server Error", classType: "danger" })
      );
    }
  }
};

export const resetProgress = async () => {
  dispatch(
    populatePlayer({
      playerStats: {
        weapon: "Fists",
        hp: 80,
        dmg: 5, //5
        attSpd: 1, //1
        def: 0,
        eva: 1,
      },
      equipment: {},
      quickBarEquipment: ["", "", ""],
      inventory: {},
    })
  );
  dispatch(setCurrentPlayerHp(80));
  dispatch(setCurrentLocation("farm"));
  dispatch(
    setCurrentEnemyStats({
      name: "Select Location",
      hp: 0,
      dmg: 0,
      attSpd: 0,
      def: 0,
      eva: 0,
    })
  );
  dispatch(setCurrentEnemyHp(0));
  try {
    await setLocalStorage();
    await updateDbProgress();
    dispatch(setMessage({ msg: "Progress Successfully Reset" }));
    return true;
  } catch (err) {
    dispatch(setMessage({ msg: "Progress Reset Failed", classType: "danger" }));
    console.log(err);
  }
};

export const deleteAccount = async () => {
  try {
    // await axios.delete('http://localhost:3001/users/remove-user', { headers: { token: localStorage.getItem('token')} });
    await axios.delete("/users/remove-user", { withCredentials: true });
    cookies.remove("loggedIn");
    dispatch(setLoading(true));
    let number = "";
    for (let i = 0; i < 8; i++) number += Math.round(Math.random() * 10);
    localStorage.removeItem("progress");
    const username = `Guest_${number}`;

    dispatch(
      populatePlayer({
        playerStats: {
          weapon: "Fists",
          hp: 80,
          dmg: 5, //5
          attSpd: 1, //1
          def: 0,
          eva: 1,
        },
        equipment: {},
        quickBarEquipment: ["", "", ""],
        inventory: {},
      })
    );
    dispatch(
      setCurrentEnemyStats({
        name: "Select Location",
        hp: 0,
        dmg: 0,
        attSpd: 0,
        def: 0,
        eva: 0,
      })
    );
    dispatch(setCurrentEnemyHp(0));
    dispatch(setCurrentPlayerHp(80));
    dispatch(setCurrentLocation("farm"));
    dispatch(updateUser({ username }));
    dispatch(setLogin(false));
    dispatch(setLoading(false));
    dispatch(
      setNotification({
        msg: "Account Successfully Removed",
        classType: "success",
      })
    );
    return true;
  } catch (err) {
    if (err.response && err.response.data.error)
      dispatch(
        setMessage({ msg: err.response.data.error, classType: "danger" })
      );
    else {
      console.log(err);
      console.log("Internal Server Error");
    }
  }
};
