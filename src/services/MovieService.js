import axios from 'axios';

const API_URL = 'http://localhost:8319/api/movies'; // Mettre à jour l'URL pour les films

// Récupérer tous les films
export const getMovies = async () => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data['hydra:member'] || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
        throw new Error('Impossible de récupérer les films.');
    }
};

// Récupérer les derniers films
export const getLatestMovies = async () => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${API_URL}?order[createdAt]=desc`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data['hydra:member'] || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des derniers films:', error);
        throw new Error('Impossible de récupérer les derniers films.');
    }
};

// Gérer le clic sur un film
export const handleMovieClick = (movie, router) => {
    router.push({ name: 'MovieInfo', params: { id: movie.id } });
};

// Récupérer un film par son ID
export const getMovieById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération du film:', error);
        throw new Error('Impossible de récupérer le film.');
    }
};

// Fonction pour ajouter un film (à implémenter selon vos besoins)
export const addMovie = async (movieData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(API_URL, movieData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du film:', error);
        throw new Error('Impossible d\'ajouter le film.');
    }
};
