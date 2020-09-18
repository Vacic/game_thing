import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { login, setLogin } from '../../redux';
import Message from '../notifications/Message';
import { setMessage } from '../../redux';
import Spinner from '../Spinner';

const LogIn = ({ isLoginHidden, toggleLogin, login, setMessage, setLogin, isLoading, showMsg, loadingEnemy }) => {
    useEffect(() => {
        loginEmail.current.focus();

        const hideLoginOnOutsideClick = e => {
            if (loginForm && !loginForm.current.contains(e.target) && !document.querySelector('.login-button').contains(e.target)) {
                toggleLogin(true);
            }
        }

        document.addEventListener('mousedown', hideLoginOnOutsideClick);
        return () => {
            document.removeEventListener('mousedown', hideLoginOnOutsideClick);
            clearTimeout(timeout.current);
            setMessage({ showMsg: false });
        }
    }, [isLoginHidden, toggleLogin]);
    
    const [loginData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = loginData;    
    
    const onChange = e => {
        setFormData({ ...loginData, [e.target.name]: e.target.value });
    }
    
    const logIn = async e => {
        e.preventDefault();
        const isLoggedIn = await login(email, password);
        if(isLoggedIn === true) {
            while(loadingEnemy===true) {
                console.log('loading enemy')
            }
            toggleLogin(true);
            setLogin(true);
        } else setMessage({ showMsg: true, msg: isLoggedIn.error, classType: 'danger' });

        if(timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setMessage({ showMsg: false }), 2000);
    }
    
    const timeout = useRef();
    const loginEmail = useRef();
    const loginForm = useRef();
    return (
        <form onSubmit={e => logIn(e)} className={isLoginHidden ? "login-form" : "login-form show"} ref={loginForm}>
            <input type="text" placeholder="Email" name="email" ref={loginEmail} onChange={e => onChange(e)}/>
            <input type="password" placeholder="Password" name="password" onChange={e => onChange(e)} />
            {showMsg ? <Message /> : isLoading ? <Spinner /> : <button type="submit" className="login-btn" >Log In</button>}
        </form>
    )
}

const mapStateToProps = state => ({
    isLoading: state.gameData.isLoading,
    loadingEnemy: state.gameData.loadingEnemy,
    showMsg: state.notifications.message.showMsg
});

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(login(email, password)),
    setMessage: newMessage => dispatch(setMessage(newMessage)),
    setLogin: isLoggedIn => dispatch(setLogin(isLoggedIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
