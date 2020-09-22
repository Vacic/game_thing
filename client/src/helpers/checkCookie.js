import axios from 'axios';
import Cookies from 'universal-cookie';
import { logout, setMessage } from '../redux';
const cookies = new Cookies();

export const checkCookie = async history => {
    if(cookies.get('loggedIn')) {
        try {
            await axios.get('/auth/checkcookie', { withCredentials: true });
            return true;
        } catch (err) {
            console.log(err.response)
            if (err.response && err.response.data.error) return ({ error: err.response.data.error});
            else if (err.response.status === 403) {
                console.log(err.response)
                setMessage({ msg: 'Please Login To Continue', classType: 'danger' });
                logout();
                cookies.remove('loggedIn');
                return history.push('/login');
            }
            else {
                console.log(err);
            }
        }
    }
}