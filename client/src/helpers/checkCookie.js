import axios from 'axios';

export const checkCookie = async () => {
    try {
        await axios.get('/auth/checkcookie', { withCredentials: true });
        return true;
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) return ({ error: err.response.data.error});
        else console.log(err);
    }
}