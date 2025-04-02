import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.74:8000/", // Asegúrate que esta IP sea correcta
    headers: { 
        "Content-Type": "application/json" 
    },
    withCredentials: false 
});

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