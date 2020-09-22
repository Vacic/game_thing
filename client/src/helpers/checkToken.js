import axios from 'axios';
import Cookies from 'universal-cookie';
import { logout, setMessage } from '../redux';
import store from '../redux/store';

const cookies = new Cookies();

export const checkToken = async history => {
    if(cookies.get('loggedIn')) {
        try {
            await axios.get('/auth/checktoken', { withCredentials: true });
            return true;
        } catch (err) {
            if (err.response.status === 403) {
                store.dispatch(setMessage({ msg: 'Please Login To Continue', classType: 'danger' }));
                store.dispatch(logout());
                cookies.remove('loggedIn');
                return history.push('/login');
            }
            else if (err.response && err.response.data.error) {
                console.log(err.response.data.error);
                return ({ error: err.response.data.error});
            }
            else {
                console.log(err);
                console.log('Internal Server Error');
            }
        }
    }
}