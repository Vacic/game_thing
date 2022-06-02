import store from "../redux/store";

export const setLocalStorage = async () => {
  const { player, gameData } = store.getState();
  const localProgress = (await localStorage.progress)
    ? JSON.parse(localStorage.getItem("progress"))
    : {};
  localProgress.playerStats = player.stats;
  localProgress.currentHp =
    gameData.currentPlayerHp === 0 ? 40 : gameData.currentPlayerHp;
  localProgress.currentLocation = gameData.currentLocation;
  localProgress.inventory = player.inventory;
  localProgress.equipment = player.equipped;
  localProgress.quickBarEquipment = player.quickBarEquipment;
  localStorage.setItem("progress", JSON.stringify(localProgress));
};
