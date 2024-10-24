import axios from 'axios';
import { useSession } from '../Stores/session.js';

export const BASE_URL = 'http://symfony.mmi-troyes.fr:8319/api';

export async function api(url, params = {}) {
    const session = useSession();

    // Préparez l'en-tête avec le token d'autorisation
    const headers = {
        Authorization: `Bearer ${session.token}`,
        'Content-Type': 'application/json',
        ...params.headers, // Ajoutez les autres en-têtes s'il y en a
    };

    try {
        // Envoyez la requête avec axios
        const response = await axios({
            url: BASE_URL + url,
            method: params.method || 'GET', // Définissez la méthode (GET par défaut)
            headers: headers,
            data: params.data || null, // Ajoutez les données si fournies
            params: params.params || null, // Ajoutez les paramètres de requête si fournis
            timeout: params.timeout || 5000, // Définissez un délai d'expiration (optionnel)
        });

        return response.data; // Retournez les données de la réponse
    } catch (error) {
        // Gérer les erreurs
        const errorMessage = error.response?.data?.error || error.message || 'Une erreur est survenue';
        throw new Error(errorMessage);
    }
}
