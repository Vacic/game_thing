import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { toggleModal } from "../../redux";

const ConfirmationModal = ({
  modal: {
    text,
    func,
    showModal,
    itemToRemove,
    history,
    redirectTo,
    redirectDelay,
  },
  toggleModal,
}) => {
  useEffect(() => {
    const hideModalOnOutsideClick = (e) =>
      confirmationModal &&
      !confirmationModal.current.contains(e.target) &&
      toggleModal(false);

    document
      .querySelector(".modal-container")
      .addEventListener("mousedown", hideModalOnOutsideClick);
    return () =>
      document
        .querySelector(".modal-container")
        .removeEventListener("mousedown", hideModalOnOutsideClick);
  }, [toggleModal]);

  const runFunc = () => {
    toggleModal(false);
    func && func(itemToRemove && itemToRemove);
    if (history)
      setTimeout(() => {
        history.push(`${redirectTo}`);
      }, redirectDelay);
  };

  const confirmationModal = useRef(null);

  return (
    <div
      className={`modal-container ${showModal ? "show-modal" : "hide-modal"}`}
    >
      <div
        className={`confirmation-modal ${showModal ? "" : "hide"}`}
        ref={confirmationModal}
      >
        <span onClick={() => toggleModal(false)}>x</span>
        <p className="modal-text">{text}</p>
        <div className="modal-buttons">
          <div className="btn neutral" onClick={() => runFunc()}>
            Yes
          </div>
          <div className="btn danger" onClick={() => toggleModal(false)}>
            No
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modal: state.notifications.modal,
});

const mapDispatchToProps = (dispatch) => ({
  toggleModal: () => dispatch(toggleModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);
