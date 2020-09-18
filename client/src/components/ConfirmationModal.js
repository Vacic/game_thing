import React, { useEffect, useRef } from 'react';

function ConfirmationModal({ text, func, isHidden, hideModal, itemToRemove }) {
    useEffect(() => {
        const hideModalOnOutsideClick = e => {
            if (confirmationModal && !confirmationModal.current.contains(e.target)) {
                hideModal();
            }
        }

        document.querySelector('.modal-container').addEventListener('mousedown', hideModalOnOutsideClick);
        return () => document.querySelector('.modal-container').removeEventListener('mousedown', hideModalOnOutsideClick);
    }, [hideModal]);

    const runFunc = () => {
        func && func(itemToRemove);
        hideModal();
    }
    
    const confirmationModal = useRef(null)
    return (
        <div className={isHidden ? "modal-container hide-modal" : "modal-container show-modal"}>
            <div className={isHidden ? "confirmation-modal hidden" : "confirmation-modal" } ref={confirmationModal}>
                <span onClick={() => hideModal()}>x</span>
                <p className="modal-text">{text}</p>
                <div className="btn-yes" onClick={() => runFunc()}>Yes</div>
                <div className="btn-no" onClick={() => hideModal()}>No</div>
            </div>
        </div>
    )
}

export default ConfirmationModal