import React from "react";
import HpBar from "../stats/HpBar";
import Spinner from "../../../helperComponents/Spinner";
import { toggleInformationModal } from "../../../../redux";
import { connect } from "react-redux";

const EnemyCard = React.memo(
  ({
    currentEnemyHp,
    maxHp,
    name,
    loadingEnemy,
    enemyHpBar,
    enemyAttStatus,
    toggleInformationModal,
  }) => {
    return (
      <div className="enemy-card">
        {name !== "Select Location" && (
          <div
            className="information icon"
            onClick={() => toggleInformationModal(true)}
          >
            i
          </div>
        )}
        <p className="name">{name}</p>
        <HpBar
          currentHp={currentEnemyHp}
          maxHp={maxHp}
          enemyHpBar={enemyHpBar}
          enemyAttStatus={enemyAttStatus}
        />
        {loadingEnemy ? (
          <Spinner />
        ) : (
          <img
            className="enemy-img"
            src="https://via.placeholder.com/150"
            alt=""
          />
        )}
      </div>
    );
  }
);

export default connect(null, (dispatch) => ({
  toggleInformationModal: (isShown) =>
    dispatch(toggleInformationModal(isShown)),
}))(EnemyCard);
