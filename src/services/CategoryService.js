import axios from 'axios';

const API_URL = 'http://localhost:8319/api/categories';

// Récupérer toutes les catégories
export const getCategories = async () => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data['hydra:member'] || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        throw new Error('Impossible de récupérer les catégories.');
    }
};

// Ajouter une nouvelle catégorie
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

// Supprimer une catégorie
export const delCategory = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        console.log(`Catégorie ${id} supprimée avec succès.`);
    } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
        throw error;
    }
};
