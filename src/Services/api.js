import axios from 'axios';

export const BASE_URL = 'http://symfony.mmi-troyes.fr:8319/api';

export async function api(url, params = {}) {
    const session = useSession();  // Récupérer la session

    // Créer les headers avec le token
    const headers = {
        Authorization: `Bearer ${session.getToken()}`,  // Utilisation de la méthode getToken()
        'Content-Type': 'application/json',
        ...params.headers  // Ajout des headers supplémentaires si fournis
    };

    // Créer les paramètres Axios en combinant les options par défaut et celles fournies
    const axiosParams = {
        method: params.method || 'GET',  // Par défaut, utiliser GET
        url: BASE_URL + url,             // URL complète de l'API
        headers,
        data: params.data || {},         // Les données à envoyer (par exemple pour POST)
        ...params                       // Fusionner avec d'autres paramètres fournis
    };

    try {
        // Faire l'appel API avec Axios
        const response = await axios(axiosParams);
        return response.data;  // Retourner la réponse si tout est OK
    } catch (error) {
        // Gérer les erreurs et retourner un message approprié
        const errorMessage = error.response?.data?.error || error.message || error.response?.status;
        throw new Error(errorMessage);
    }
}