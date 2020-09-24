import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Message from '../notifications/Message';
import { login, hideMessage } from '../../redux';

function LoginForm({ hideMessage, showMsg, login }) {
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
        if(isLoggedIn === true) setTimeout(() => history.push('/'), 1000);
    }
    const history = useHistory();
    return (
        <div className="login-container">
            <div className ="login-form">
                {showMsg && <Message />}
                <h2>Log In</h2>
                <form onSubmit={e => submit(e)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={e => onChange(e)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={e => onChange(e)} />
                    </div>
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
    hideMessage: () => dispatch(hideMessage()),
    login: (email, password) => dispatch(login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
