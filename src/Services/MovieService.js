import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api/movies';

export const getMovies = async () => {
    try {
        const { data } = await axios.get(`${API_URL}?order[createdAt]=desc`);
        return data['hydra:member'] || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
        return [];
    }
};

export const getMovieById = async (id) => {
    try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        return data; // Retourne les détails de l'acteur
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'acteur avec l'ID ${id}:`, error);
        return null; // Retourne null en cas d'erreur
    }
};

export const addMovie = async (actor) => {
    try {
        const response = await axios.post(API_URL, actor);
        return response.data; // Retourne les données du film ajouté
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'acteur:', error);
        throw error; // Lance l'erreur pour que l'appelant puisse la gérer
    }
};

export const editMovie = async (actor) => {
    try {
        const response = await axios.patch(API_URL, actor);
        return response.data; // Retourne les données du film ajouté
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'acteur:', error);
        throw error; // Lance l'erreur pour que l'appelant puisse la gérer
    }
};

export const getLatestMovies = async () => {
    try {
        const response = await axios.get(`${API_URL}?order[createdAt]=desc&limit=4`);
        return response.data['hydra:member'];
    } catch (error) {
        console.error('Erreur lors de la récupération des derniers films:', error);
        throw error;
    }
};

export const handleMovieClick = (movie, router) => {
    // Rediriger vers la page de détails du film
    router.push({ name: 'MovieInfo', params: { id: movie.id } });
};

export const delMovie = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw error;
    }
};