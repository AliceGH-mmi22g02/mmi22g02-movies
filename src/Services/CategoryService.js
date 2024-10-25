import axios from 'axios';

const API_URL = 'http://symfony.mmi-troyes.fr:8319/api/categories';

export const getCategories = async () => {
    try {
        const { data } = await axios.get(API_URL,);
        return data['hydra:member'] || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
        return [];
    }
};

export const addCategory = async (category) => {
    try {
        const response = await axios.post(API_URL, category);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la categorie:", error);
        throw error;
    }
};

export const delCategory = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw error;
    }
};