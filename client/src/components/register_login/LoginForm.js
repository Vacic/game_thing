import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { login, hideMessage } from '../../redux';
import Message from '../helperComponents/notifications/Message';

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
                <form onSubmit={e => submit(e)}>
                    <h2 className="center">Login</h2>
                    <Link to="/"><i className="fas fa-2x fa-home" /></Link>
                    <div className="form-spacing">
                        <label className="label-control" htmlFor="email">Email</label>
                        <input className="input-control" type="email" name="email" onChange={e => onChange(e)} />
                    </div>
                    <div className="form-spacing">
                        <label className="label-control" htmlFor="password">Password</label>
                        <input className="input-control" type="password" name="password" onChange={e => onChange(e)} />
                    </div>
                    <p><Link to="/register">Don't have an account?</Link></p>
                    <div className="button">
                        <button className="btn neutral center" type="submit" >Login</button>
                    </div>
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
