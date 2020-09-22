import axios from 'axios';

export const updateDbProgress = async () => {
    const body = localStorage.getItem('progress');
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
    try {
        await axios.put(`/users/progress`, body, config);
        console.log('Progress Updated');
    } catch (err) {
        if(err.response.status === 403) return console.log('Unauthorized Request, Cookie Not Found')
        err.response && err.response.data && err.response.data.error && console.log(err.response.data.error);
        console.log(err);
    }
}
