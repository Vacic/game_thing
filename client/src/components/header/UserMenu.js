import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLocalStorage, updateDbProgress } from '../../helpers'
import { logout } from '../../redux';
import Spinner from '../Spinner';


const UserMenu = ({ isUserMenuHidden, toggleMenu, logout, isLoading }) => {
    const [updateProgressLoading, toggleUpdateProgressLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
        const hideMenuOnOutsideClick = e => {
            if (userMenu && !userMenu.current.contains(e.target) && !document.querySelector('.user-nav').contains(e.target)) {
                toggleMenu(true);
            }
        }

        document.addEventListener('mousedown', hideMenuOnOutsideClick);
        return () => {
            document.removeEventListener('mousedown', hideMenuOnOutsideClick);
            toggleMenu(!isUserMenuHidden);
        };
    }, [isUserMenuHidden, toggleMenu]);

    const updateProgress = async () => {
        toggleUpdateProgressLoading(true);
        await updateDbProgress(history);
        await setLocalStorage();
        toggleUpdateProgressLoading(false);
    }

    const userMenu = useRef();
    return (
        <div className={isUserMenuHidden ? "user-menu" : "user-menu show"} ref={userMenu} >
            <ul className="user-menu-options">
                <li><Link to='#!'>Profile</Link></li>
                <div className="separator"></div>
                {updateProgressLoading ? <Spinner /> : <li onClick={() => updateProgress()}>Force Update</li>}
                <div className="separator"></div>
                {isLoading ? <Spinner /> : <li onClick={() => logout()}>Logout</li>}
            </ul>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const mapStateToProps = state => ({
    isLoading: state.gameData.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
