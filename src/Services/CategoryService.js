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
        category.createdAt = new Date().toISOString();
        category.updatedAt = new Date().toISOString();
        const response = await axios.post(API_URL, category);
        return response.data; // Retourne les données de l'acteur ajouté
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'acteur:', error);
        throw error; // Lance l'erreur pour que l'appelant puisse la gérer
    }
};

export const delCategory = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        console.log(`Catégorie ${id} supprimée avec succès.`);
    } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
        throw error;
    }
};