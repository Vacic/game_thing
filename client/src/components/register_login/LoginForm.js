import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Message from '../notifications/Message';
import { setMessage, login } from '../../redux';

function LoginForm({ setMessage, login }) {
    const [loginFormData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => () => {
        clearTimeout(timeout.current);
        setMessage({ showMsg: false });
    }, [setMessage])

    const { email, password } = loginFormData;

    const onChange = e => {
        setFormData({ ...loginFormData, [e.target.name]: e.target.value });
    }

    const submit = async e => {
        e.preventDefault();
        const isLoggedIn = await login(email, password);
        if(isLoggedIn === true) {
            setMessage({ msg: 'Logged In Successfully', showMsg: true, classType: 'success' });
            setTimeout(() => history.push('/'), 1000);
        }
        else setMessage({ msg: isLoggedIn.error, classType: 'danger', showMsg: true });
        if(timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setMessage({ showMsg: false }), 5000);
    }
    const timeout = useRef();
    const history = useHistory();
    return (
        <div className="login-container">
            <div className ="login-form">
                <Message />
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

const mapDispatchToProps = dispatch => ({
    setMessage: newMessage => dispatch(setMessage(newMessage)),
    login: (email, password) => dispatch(login(email, password))
});

export default connect(null, mapDispatchToProps)(LoginForm);
