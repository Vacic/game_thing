import React, { useState, useRef, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Message from '../helperComponents/notifications/Message';
import { deleteAccount, editProfile, resetProgress} from '../../services'
import { setMessage, setModal } from '../../redux';
import ConfirmationModal from '../helperComponents/ConfirmationModal';

const Profile = ({ user, setMessage, showMsg, setModal, showModal }) => {
    const [formData, updateFormData] = useState({
        username: user.username,
        email: user.email,
        password: '',
        confirmPassword: ''
    })

    useEffect(() => () => clearInterval(timeout.current))

    const onChange = e => {
        updateFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();

        if(username !== user.username & user.username !== '' || email !== user.email & user.email !== '' || password !== '' ) {
            console.log(formData)
            const newFormData = { username, email, password }
            for(const property in newFormData) if(newFormData[property] === '' || newFormData[property] === user[property]) delete newFormData[property];
            console.log(newFormData)
            if (newFormData.password) {
                if(newFormData.password === confirmPassword) editProfile(newFormData);
                else setMessage({ msg: 'Passwords Don\'t Match', classType: 'danger' });
                
            } else editProfile(newFormData);
        } else setMessage({ msg: 'No Changes Made', classType: 'neutral' });
    }

    const resetProg = async () => {
        setModal({ text: 'Are you sure you want to reset your progress? This action is irreversible.', 
                   func: resetProgress, 
                   history: history,
                   redirectTo: '/',
                   redirectDelay: 2000
                 });
    }

    const deleteAcc = async () => {
        setModal({ text: 'Are you sure you want to delete your account? This action is irreversible.', 
                   func: deleteAccount, 
                   history: history,
                   redirectTo: '/',
                   redirectDelay: 2000
                 });
    }

    const { username, email, password, confirmPassword } = formData;
    const history = useHistory();
    const timeout = useRef();

    return (
        <div className="profile-container">
            <div className="profile">
            <ConfirmationModal />
            {showMsg && <Message />}
                <form onSubmit={ e => onSubmit(e) }>
                    <h2 className="center">{ user.username }</h2>
                    <Link to="/"><i className="fas fa-2x fa-home" /></Link>
                    <div className="form-spacing">
                        <label className="label-control" htmlFor="username">Username</label>
                        <input className="input-control" type="text" value={ formData.username } name="username" onChange={ e => onChange(e) }/>
                        <small>*Must contain at least 2 characters</small>
                    </div>
                    <div className="form-spacing">
                        <label className="label-control" htmlFor="email">Email</label>
                        <input className="input-control" type="email" value={ formData.email } name="email" onChange={ e => onChange(e) }/>
                    </div>
                    <div className="form-spacing">
                        <label className="label-control" htmlFor="password">Password</label>
                        <input className="input-control" type="password" name="password" onChange={ e => onChange(e) }/>
                        <small>*Must contain at least one letter, number and a special character</small>
                    </div>
                    <div className="form-spacing">
                        <label className="label-control" htmlFor="confirm-password">Confirm Password</label>
                        <input className="input-control" type="password" name="confirmPassword" onChange={ e => onChange(e) }/>
                    </div>
                    <div className="profile-buttons">
                        <button className="btn neutral" type="submit">Edit Profile</button>
                        <div className="btn danger" onClick={ () => resetProg() }>Reset Progress</div>
                        <div className="btn danger" onClick={ () => deleteAcc() }>Delete Profile</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.player.user,
    showMsg: state.notifications.message.showMsg,
    showModal: state.notifications.modal.showModal
});

const mapDispatchToProps = dispatch => ({
    setMessage: msg => dispatch(setMessage(msg)),
    setModal: newModal => dispatch(setModal(newModal))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
