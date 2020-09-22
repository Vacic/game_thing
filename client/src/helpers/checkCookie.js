import React from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { setMessage } from '../redux';
const cookies = new Cookies();

export const checkCookie = async () => {
    if(cookies.get('loggedIn')) {
        try {
            await axios.get('/auth/checkcookie', { withCredentials: true });
            return true;
        } catch (err) {
            if (err.response && err.response.data.error) return ({ error: err.response.data.error});
            else if (err.response.status === 403) {
                setMessage({ msg: 'Please Login To Continue', classType: 'danger' });
                cookies.remove('loggedIn');
                return <Redirect to='/login' />;
            }
            else {
                console.log(err);
            }
        }
    }
}