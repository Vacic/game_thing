import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { register } from '../../helpers';
import Message from '../notifications/Message';
import { setMessage } from '../../redux';

const RegistrationForm = React.memo(({ setMessage }) => {
    const [registerFormData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [regLoading, toggleRegLoading] = useState(false);

    useEffect(() => () => {
        setMessage({ showMsg: false });
        clearTimeout(timeout.current);
    }, [setMessage]);

    const { username, email, password, confirmPassword } = registerFormData;

    const onChange = e => {
        setFormData({ ...registerFormData, [e.target.name]: e.target.value });
    }

    const submit = async e => {
        e.preventDefault();
        if(password === confirmPassword) {
            toggleRegLoading(true)
            const isRegistered = await register({ username, email, password });
            if(isRegistered === true) {
                setMessage({ msg: 'Successfully Registered', showMsg: true, classType: 'success' });
                setTimeout(() => history.push('/'), 2000);
            }
            else {
                setMessage({ msg: isRegistered.error, classType: 'danger', showMsg: true });
                toggleRegLoading(false);
            }
        } else {
            setMessage({ msg: 'Passwords Don\'t Match', classType: 'danger', showMsg: true });
            toggleRegLoading(false);
        }
        if(timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(() => setMessage({ showMsg: false }), 5000);
    }
    const timeout = useRef();
    const history = useHistory();
    return (
        <div className="registration-container">
            <div className ="registration-form">
                <Message />
                <h2>Create an Account</h2>
                <form onSubmit={e => submit(e)}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={e => onChange(e)} />  
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={e => onChange(e)} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={e => onChange(e)} />
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" name="confirmPassword" onChange={e => onChange(e)} />
                    <p><Link to="/login">Already have an account?</Link></p>
                    <button type="submit" disabled={regLoading ? true : false}>Create Account</button>
                </form>
            </div>
        </div>
    )
});

const mapDispatchToProps = dispatch => ({
    setMessage: newMessage => dispatch(setMessage(newMessage))
});

export default connect(null, mapDispatchToProps)(RegistrationForm);
