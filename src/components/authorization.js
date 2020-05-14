import decode from 'jsonwebtoken/decode';

export const authenticationService = {
    user: () => {
        const verify = decode((localStorage.getItem('token') || '').replace('Bearer ', ''));
        if (!verify) return null
        if (verify.exp * 1000 < new Date().getTime()) {
            console.log('Token Expired')
            localStorage.clear()
            return null
        }
        return localStorage.getItem('user') || null
    },
    setToken: (token, username) => {
        localStorage.setItem('token', 'Bearer ' + token)
        localStorage.setItem('user', username)
        setTimeout(() => {
            localStorage.clear()
        }, 3600 * 5 * 60)
    },
    getToken: () => {
        return localStorage.getItem('token')
    },
    removeToken: () => {
        localStorage.clear();
    },
    getUserInfo: () => {
        const verify = decode((localStorage.getItem('token') || '').replace('Bearer ', ''));
        if (verify) {
            return { firstName: verify.given_name, lastName: verify.family_name, email: verify.email }
        }
        return null;
    },
    getRole: () => {
        const verify = decode((localStorage.getItem('token') || '').replace('Bearer ', ''));
        if (verify) {
            return verify.nameid;
        }
        return null;
    },
    isAdmin: () => {
        const verify = decode((localStorage.getItem('token') || '').replace('Bearer ', ''));
        if (verify) {
            const ROLES = process.env.REACT_APP_ADMIN_ROLES
            return ROLES.split(',').includes(verify.role)
        }
        return false;
    }
}