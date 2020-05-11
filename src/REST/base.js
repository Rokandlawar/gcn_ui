import Axios from 'axios';
import { authenticationService } from '../components/authorization';
import DefaultSettings from '../components/settings';

const URL = process.env.REACT_APP_API_URL

export default function Base(done, fail) {
    const instance = Axios.create({
        baseURL: URL,
        headers: {
            'Authorization': authenticationService.getToken()
        }
    })

    instance.interceptors.request.use(function (config) {
        if (DefaultSettings.getLoader() != null)
            DefaultSettings.getLoader().add();
        return config;
    }, function (error) {
        return Promise.reject(error);
    })

    instance.interceptors.response.use(function (response) {
        if (DefaultSettings.getLoader() != null)
            DefaultSettings.getLoader().remove();
        if (DefaultSettings.getAlert() != null && done !== null && done !== undefined)
            DefaultSettings.getAlert().show(done, 'success');
        return response
    }, function (error) {
        if (DefaultSettings.getLoader() != null)
            DefaultSettings.getLoader().remove();
        if (DefaultSettings.getAlert() != null)
            DefaultSettings.getAlert().show(fail || 'Error Occurred', 'error');
        return Promise.reject(error);
    });

    return instance;
}