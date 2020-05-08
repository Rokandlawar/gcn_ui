import Axios from 'axios';
import { authenticationService } from '../components/authorization';

const URL = process.env.REACT_APP_API_URL

export default function Base() {
    return Axios.create({
        baseURL: URL,
        headers: {
            'Authorization': authenticationService.getToken()
        }
    });
}