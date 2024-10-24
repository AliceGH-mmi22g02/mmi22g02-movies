import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:8319",
    headers: {
        Accept: "application/json",
    },
});

// Intercepteur pour ajouter le token à chaque requête
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
