import axios from "axios"
import { v4 as uuidv4 } from 'uuid';

axios.interceptors.request.use(    
    function (config) {
        const token = sessionStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (err) {
        return Promise.reject(err)
    }
)

export const signUp = async (email : string, password: string, firstName : string, lastName : string) => {
    const response = await axios.post('/auth/register', { id : uuidv4(), email, password, firstName, lastName })

    return response;
}

export const signIn = async (email : string, password:  string) => {
    const response = await axios.post('/auth/login', { email, password })
    
    return response.data;
}

export const verifyToken = async (token: string) => { 
    const res  = await axios.post('/auth/verify-token', { token })

    return res;
}