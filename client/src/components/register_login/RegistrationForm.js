import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { register } from '../../services';
import { hideMessage, setMessage } from '../../redux';
import Message from '../helperComponents/notifications/Message';

const RegistrationForm = React.memo(({ setMessage, hideMessage, showMsg }) => {
    const [registerFormData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [regLoading, toggleRegLoading] = useState(false);

    useEffect(() => () => hideMessage(), [hideMessage]);

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
                setMessage({ msg: 'Successfully Registered' });
                setTimeout(() => history.push('/'), 2000);
            }
            else {
                setMessage({ msg: isRegistered ?? 'Internal Server Error', classType: 'danger' });
                toggleRegLoading(false);
            }
        } else {
            setMessage({ msg: 'Passwords Don\'t Match', classType: 'danger' });
            toggleRegLoading(false);
        }
    }
    const history = useHistory();
    return (
        <div className="registration-container">
            <div className ="registration-form">
                {showMsg && <Message />}
                <h2>Create an Account</h2>
                <form onSubmit={e => submit(e)}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" onChange={e => onChange(e)} />
                        <small>*Must contain at least 2 characters</small>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={e => onChange(e)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={e => onChange(e)} />
                        <small>*Must contain at least one letter, number and a special character</small>
                    </div>
                    <div>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" name="confirmPassword" onChange={e => onChange(e)} />
                    </div>
                    <p><Link to="/login">Already have an account?</Link></p>
                    <button type="submit" disabled={regLoading ? true : false}>Create Account</button>
                </form>
            </div>
        </div>
    )
});

const mapStateToProps = state => ({
    showMsg: state.notifications.message.showMsg
});

const mapDispatchToProps = dispatch => ({
    setMessage: newMessage => dispatch(setMessage(newMessage)),
    hideMessage: () => dispatch(hideMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
