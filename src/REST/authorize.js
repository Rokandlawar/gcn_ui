import Axios from './base';
import axios from 'axios';

const URL = process.env.REACT_APP_API_URL + '/Authorize'

export const Authorize = (username, password) => {
    return axios.post(`${URL}/Token`, { username, password })
}

export const GetUser = (usernmae) => {
    return Axios().get('Authorize/' + usernmae)
}