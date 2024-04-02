import axios from "axios"

export const signUp = async (userName : string, password: string) => {
    const response = await axios.post('/auth/signUp', { userName, password })

    return response;
}