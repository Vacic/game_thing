import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toggleInformationModal } from "../../redux";

const InformationModal = ({
  modal: { showInformationModal },
  locationEnemies,
  toggleInformationModal,
  location,
  enemyName,
  currentEnemy,
  itemList,
}) => {
  const [enemyDrops, setEnemyDrops] = useState([]);

  useEffect(() => {
    const hideModalOnOutsideClick = (e) =>
      informationModal &&
      !informationModal.current.contains(e.target) &&
      toggleInformationModal(false);

    document
      .querySelector(".information-modal-container")
      .addEventListener("mousedown", hideModalOnOutsideClick);
    return () =>
      document
        .querySelector(".information-modal-container")
        .removeEventListener("mousedown", hideModalOnOutsideClick);
  }, [toggleInformationModal]);

  const nameToObjectProperty = (name) => {
    const property = name.toLowerCase().replace(/ /g, "_");
    return property;
  };

  const objectPropertyToName = (objectProperty) => {
    const name = objectProperty.replace(/_/g, " ");
    return name;
  };

  useEffect(() => {
    const nameOfEnemyProperty = nameToObjectProperty(enemyName);
    if (nameOfEnemyProperty !== "select_location") {
      const enemy = locationEnemies[location][nameOfEnemyProperty];
      setEnemyDrops(Object.keys(enemy.drops));
    }
  }, [currentEnemy]);

  const informationModal = useRef(null);

  return (
    <div
      className={`information-modal-container ${
        showInformationModal ? "show-modal" : "hide-modal"
      }`}
    >
      <div
        className={`information-modal ${showInformationModal ? "" : "hide"}`}
        ref={informationModal}
      >
        <div className="modal-content">
          {enemyDrops.length > 0 &&
            enemyDrops.map((drop, i) => (
              <div key={i} className="modal-item">
                <img
                  src={itemList[drop].img}
                  alt={drop}
                  className="item-icon"
                />
                {objectPropertyToName(drop)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modal: state.notifications.modal,
  locationEnemies: state.locationEnemies,
  currentEnemy: state.gameData.currentEnemy,
  itemList: state.items,
});

const mapDispatchToProps = (dispatch) => ({
  toggleInformationModal: (isShown) =>
    dispatch(toggleInformationModal(isShown)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InformationModal);
