import axios from "axios";
import apiClient from './api';

const API_URL = "http://localhost:8319/api/auth"; // Mettez à jour avec votre URL

export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(API_URL, { email, password });
        // Vérifiez si la réponse contient les données attendues
        if (response.data && response.data.token) {
            return {
                user: {
                    email: response.data.email, // Assurez-vous que l'email est renvoyé
                },
                token: response.data.token, // Assurez-vous que le token est renvoyé
            };
        } else {
            throw new Error("Invalid response format");
        }
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Unable to login. Please check your credentials.");
    }
};

export default {
    login,
    async getCurrentUser() {
        try {
            const response = await apiClient.get('/api/me');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            throw error;
        }
    },
};
