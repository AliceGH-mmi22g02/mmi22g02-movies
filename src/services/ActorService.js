import axios from 'axios';

const API_URL = 'http://localhost:8319/api/actors';

// Récupérer tous les acteurs
export const getActors = async () => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data['hydra:member'] || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des acteurs:', error);
        throw new Error('Impossible de récupérer les acteurs.');
    }
};

// Récupérer les derniers acteurs
export const getLatestActors = async () => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${API_URL}?order[createdAt]=desc`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data['hydra:member'] || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des derniers acteurs:', error);
        throw new Error('Impossible de récupérer les derniers acteurs.');
    }
};

// Gérer le clic sur un acteur
export const handleActorClick = (actor, router) => {
    router.push({ name: 'ActorInfo', params: { id: actor.id } });
};

// Récupérer un acteur par son ID
export const getActorById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'acteur:', error);
        throw new Error('Impossible de récupérer l\'acteur.');
    }
};

export function addActor() {
}
