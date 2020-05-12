import Axios from './base';
//import axios from 'axios';

const URL = process.env.REACT_APP_API_URL + '/Authorize'

export const Authorize = (username, password) => {
    return Axios('Welcome ' + username, 'Invalid Username/Password').post(`${URL}/Token`, { username, password })
}

export const GetUser = (usernmae) => {
    return Axios().get('Authorize/' + usernmae)
}

export const ValidateToken = (id) => Axios().get('Authorize/Validate/' + id);

export const ResetPassword = (id, entity) => Axios('Password Saved !').post('Authorize/Reset/' + id, entity);