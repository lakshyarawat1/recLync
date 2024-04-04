import axios from "axios"
import { v4 as uuidv4 } from 'uuid';

export const signUp = async (email : string, password: string, firstName : string, lastName : string) => {
    const response = await axios.post('/auth/register', { id : uuidv4(), email, password, firstName, lastName })

    return response;
}

export const signIn = async (email : string, password:  string) => {
    const response = await axios.post('/auth/login', { email, password })
    
    return response;
}