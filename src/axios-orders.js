import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-practice-burger-aebf4.firebaseio.com/'
});

export default instance;