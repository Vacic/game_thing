import axios from 'axios';

export const register = async formData => {
    const localProgress = localStorage.progress ? JSON.parse(localStorage.getItem('progress')) : {};
    const data = { ...formData, ...localProgress };
    const body = JSON.stringify(data);
    try {
        await axios.post('http://localhost:5000/users', body, { headers: { 'Content-Type': 'application/json' } });
        return true
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) return ({ error: err.response.data.error});
        else console.log(err);
    }
}