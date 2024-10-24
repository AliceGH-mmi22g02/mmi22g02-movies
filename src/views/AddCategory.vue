<template>
  <div id="body">
    <h1>Add Category</h1>
    <div id="form-container">
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Nom :</label>
          <input type="text" v-model="title" required />
        </div>
        <button type="submit">Ajouter la categorie</button>
      </form>
    </div>
  </div>
</template>

<script>
import { addCategory } from '@/services/CategoryService';

export default {
  data() {
    return {
      title: '',
    };
  },
  methods: {
    async submitForm() {
      const newCategory = {
        title: this.title,
      };
      try {
        await addCategory(newCategory);
        this.resetForm();
        this.$emit('actor-added');
        alert('Categorie ajoutée avec succès !');
        await this.$router.push({ name: 'categories' });
      } catch (error) {
        if (error.response) {
          console.error('Erreur lors de l\'ajout de la categorie:', error.response.data);
        } else {
          console.error('Erreur lors de l\'ajout de la categorie:', error);
        }
      }
    },
    resetForm() {
      this.title = '';
    }
  }
};
</script>

<style>
#body {
  text-align: center;
  margin-top: 50px;
}

#form-container {
  display: flex;
  justify-content: center;
}

form {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input, textarea {
  padding: 8px;
  border-radius: 5px;
  border: solid 1px grey;
  margin-left: 20px;
}

button {
  margin-left: 20px;
  padding: 10px 15px;
  background-color: #ffcefd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
