import axios from 'axios';
import { setLogin, setMessage } from '../redux';
import store from '../redux/store';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const updateDbProgress = async history  => {
    const body = JSON.parse(localStorage.getItem('progress'));
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
    try {
        await axios.put(`/users/progress`, body, config);
        // await axios.put(`http://localhost:3001/users/progress`, body, { headers: { token: localStorage.getItem('token')} });
        console.log('Progress Updated');
        store.dispatch(setMessage({ msg: 'Saved!' }));
    } catch (err) {
        if(err.response.status === 403) {
            store.dispatch(setMessage({ msg: 'Cookie Not Found. Please Login Again', classType: 'danger'}));
            store.dispatch(setLogin(false));
            cookies.remove('loggedIn');
            return history.push('/login');
        }
        err.response && err.response.data && err.response.data.error && console.log(err.response.data.error);
        store.dispatch(setMessage({ msg: 'Error!', classType: 'danger' }));
        console.log(err);
    }
}
