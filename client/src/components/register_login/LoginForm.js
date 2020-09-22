import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Message from '../notifications/Message';
import { setMessage, login, hideMessage } from '../../redux';

function LoginForm({ setMessage, hideMessage, showMsg, login }) {
    const [loginFormData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => () => hideMessage(), [hideMessage])

    const { email, password } = loginFormData;

    const onChange = e => {
        setFormData({ ...loginFormData, [e.target.name]: e.target.value });
    }

    const submit = async e => {
        e.preventDefault();
        const isLoggedIn = await login(email, password);
        if(isLoggedIn === true) {
            setMessage({ msg: 'Logged In Successfully' });
            setTimeout(() => history.push('/'), 1000);
        }
        else setMessage({ msg: isLoggedIn.error, classType: 'danger' });
    }
    const history = useHistory();
    return (
        <div className="login-container">
            <div className ="login-form">
                {showMsg && <Message />}
                <h2>Log In</h2>
                <form onSubmit={e => submit(e)}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={e => onChange(e)} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={e => onChange(e)} />
                    <p><Link to="/register">Don't have an account?</Link></p>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>

        
    )
}

const mapStateToProps = state => ({
    showMsg: state.notifications.message.showMsg
});

const mapDispatchToProps = dispatch => ({
    setMessage: newMessage => dispatch(setMessage(newMessage)),
    hideMessage: () => dispatch(hideMessage()),
    login: (email, password) => dispatch(login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
