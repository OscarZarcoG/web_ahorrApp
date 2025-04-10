import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.74:8000/",
    headers: { 
        "Content-Type": "application/json" 
    },
    withCredentials: false 
});
//http://192.168.1.74:8000/
//http://192.168.155.113:8000/

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;