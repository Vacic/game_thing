import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLocalStorage, updateDbProgress } from '../../../services'
import { hideMessage, logout } from '../../../redux';
import Spinner from '../../helperComponents/Spinner';
import Message from '../../helperComponents/notifications/Message';

const UserMenu = ({ isUserMenuHidden, toggleMenu, logout, isLoading, showMsg, hideMessage }) => {
    const [updateProgressLoading, toggleUpdateProgressLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
        const hideMenuOnOutsideClick = e => 
            userMenu && 
            !userMenu.current.contains(e.target) && 
            !document.querySelector('.user-nav').contains(e.target) && 
            toggleMenu(true);

        document.addEventListener('mousedown', hideMenuOnOutsideClick);
        return () => {
            document.removeEventListener('mousedown', hideMenuOnOutsideClick);
            toggleMenu(!isUserMenuHidden);
            hideMessage();
        };
    }, [isUserMenuHidden, toggleMenu, hideMessage]);

    const updateProgress = async () => {
        toggleUpdateProgressLoading(true);
        await setLocalStorage();
        await updateDbProgress(history);
        toggleUpdateProgressLoading(false);
    }

    const userLogout = async () => {
        await setLocalStorage();
        await updateDbProgress(history);
        logout();
    }

    const userMenu = useRef();
    return (
        <div className={isUserMenuHidden ? "user-menu" : "user-menu show"} ref={userMenu} >
            <ul className="user-menu-options">
                <Link to='/profile'><li>Profile</li></Link>
                <div className="separator"></div>
                {showMsg ? <Message /> : updateProgressLoading ? <Spinner /> : <li onClick={() => updateProgress()}>Force Save</li>}
                <div className="separator"></div>
                {isLoading ? <Spinner /> : <li onClick={() => userLogout()}>Logout</li>}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    isLoading: state.gameData.isLoading,
    showMsg: state.notifications.message.showMsg
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    hideMessage: () => dispatch(hideMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
