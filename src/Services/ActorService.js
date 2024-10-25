import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api/actors';

// Récupérer tous les acteurs
export const getActors = async () => {
    try {
        const { data } = await axios.get(API_URL);
        return data['hydra:member'] || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des acteurs:', error);
        return [];
    }
};

// Récupérer un acteur par son ID
export const getActorById = async (id) => {
    try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        return data; // Retourne les détails de l'acteur
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'acteur avec l'ID ${id}:`, error);
        return null; // Retourne null en cas d'erreur
    }
};

// Ajouter un nouvel acteur

export const addActor = async (actor) => {
    try {
        const response = await axios.post(API_URL, actor);
        return response.data; // Retourne les données de l'acteur ajouté
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'acteur:', error);
        throw error; // Lance l'erreur pour que l'appelant puisse la gérer
    }
};

// Récupérer les derniers acteurs ajoutés
export const getLatestActors = async () => {
    try {
        const response = await axios.get(`${API_URL}?order[createdAt]=desc&limit=4`);
        return response.data['hydra:member'];
    } catch (error) {
        console.error('Erreur lors de la récupération des derniers acteurs:', error);
        throw error;
    }
};

// Gérer le clic sur un acteur
export const handleActorClick = (actor, router) => {
    // Rediriger vers la page de détails de l'acteur
    router.push({ name: 'ActorInfo', params: { id: actor.id } });
};

export const delActor = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw error;
    }
};