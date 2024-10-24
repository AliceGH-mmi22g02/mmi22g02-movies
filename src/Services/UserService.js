import { api } from '@/services/api.js';

export default {
    // Méthode pour s'inscrire
    register (credentials) {
        return api('/user/register', {
            method: 'POST',
            data: credentials // Utilisation de 'data' pour envoyer les données
        });
    },

    // Méthode pour se connecter
    login (credentials) {
        return api('/user/login', {
            method: 'POST',
            data: credentials // Utilisation de 'data' pour envoyer les données
        });
    },

    // Méthode pour obtenir les informations de l'utilisateur
    user () {
        return api('/user'); // Requête GET par défaut pour obtenir les informations utilisateur
    }
};
