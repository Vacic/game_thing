import axios from 'axios';

export const updateDbProgress = async () => {
    const token = localStorage.getItem('token');
    const body = localStorage.getItem('progress');
    const config = { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } };
    try {
        await axios.put(`/users/progress`, body, config);
        //await axios.put(`http://localhost:3001/users/progress`, body, config);
        console.log('Progress Updated');
    } catch (err) {
        err.response && err.response.data && err.response.data.error && console.log(err.response.data.error);
        console.log(err);
    }
}
