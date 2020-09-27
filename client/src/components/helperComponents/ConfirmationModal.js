import React, { useEffect, useRef } from 'react';

const ConfirmationModal = ({ text, func, isHidden, hideModal, itemToRemove }) => {
    useEffect(() => {
        const hideModalOnOutsideClick = e => 
            confirmationModal && 
            !confirmationModal.current.contains(e.target) &&
            hideModal();

        document.querySelector('.modal-container').addEventListener('mousedown', hideModalOnOutsideClick);
        return () => document.querySelector('.modal-container').removeEventListener('mousedown', hideModalOnOutsideClick);
    }, [hideModal]);

    const runFunc = () => {
        func && func(itemToRemove);
        hideModal();
    }
    
    const confirmationModal = useRef(null)
    return (
        <div className={`modal-container ${isHidden ? 'hide-modal' : 'show-modal'}`}>
            <div className={`confirmation-modal ${isHidden ? 'hide' : ''}`} ref={confirmationModal}>
                <span onClick={() => hideModal()}>x</span>
                <p className="modal-text">{text}</p>
                <div className="btn-yes" onClick={() => runFunc()}>Yes</div>
                <div className="btn-no" onClick={() => hideModal()}>No</div>
            </div>
        </div>
    )
}

export default ConfirmationModal