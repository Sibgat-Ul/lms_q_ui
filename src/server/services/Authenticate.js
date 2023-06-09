import api from './API';

function login(credentials) {
    return api.get("/user/login/", {
        params: {
            email: credentials.email,
            password: credentials.password,
            role: credentials.role
        }
    });
}

function register(credentials) {
    return api.post(`/user/register/`, {
        params: {
            name: credentials.name,
            password: credentials.password,
            role: credentials.role,
            email: credentials.email,
        }
    });
}

export {
    login, register
}

