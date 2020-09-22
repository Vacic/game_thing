import axios from 'axios';
import { setMessage } from '../redux';
import { store } from 'redux'

export const updateDbProgress = async history => {
    const body = localStorage.getItem('progress');
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
    try {
        await axios.put(`/users/progress`, body, config);
        console.log('Progress Updated');
    } catch (err) {
        if(err.response.status === 403) {
            console.log(store)
            store.dispatch(setMessage({ msg: 'Cookie Not Found. Please LogIn Again', classType: 'danger'}));
            return history.push('/login');
        }
        err.response && err.response.data && err.response.data.error && console.log(err.response.data.error);
        console.log(err);
    }
}
