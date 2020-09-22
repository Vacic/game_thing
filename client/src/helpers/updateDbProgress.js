import axios from 'axios';
import { setMessage } from '../redux';
import store from '../redux/store';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const updateDbProgress = async history => {
    const body = localStorage.getItem('progress');
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
    try {
        await axios.put(`/users/progress`, body, config);
        console.log('Progress Updated');
    } catch (err) {
        if(err.response.status === 403) {
            store.dispatch(setMessage({ msg: 'Cookie Not Found. Please Login Again', classType: 'danger'}));
            cookies.remove('loggedIn');
            return history.push('/login');
        }
        err.response && err.response.data && err.response.data.error && console.log(err.response.data.error);
        console.log(err);
    }
}
