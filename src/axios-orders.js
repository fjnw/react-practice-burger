import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://react-practice-burger-aebf4.firebaseio.com/'
});

export default instance;