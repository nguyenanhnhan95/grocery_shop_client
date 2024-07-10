import axios from "axios";
const http = "http://localhost:8080/auth/login";
export const loginAuth = async (account) => {
    try {
        const response = await axios.post(http, account );
        return response.data;

    } catch (error) {
        console.log(error)
        return error.response;
    }
}