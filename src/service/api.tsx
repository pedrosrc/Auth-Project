import axios from "axios";

const api = axios.create({
    baseURL: 'https://jwt-0v8q.onrender.com'
});

export default api;