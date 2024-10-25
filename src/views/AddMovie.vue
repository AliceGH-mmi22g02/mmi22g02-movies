<template>
  <div id="body">
    <h1>Add Movie</h1>
    <div id="form-container">
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Titre :</label>
          <input type="text" v-model="title" required />
        </div>
        <div>
          <label for="releaseDate">Date de Sortie (JJ-MM-AAAA) :</label>
          <input type="date" v-model="releaseDate" @input="validateDate('releaseDate')" required />
        </div>
        <div>
          <label for="director">Réalisateur :</label>
          <input type="text" v-model="director" required />
        </div>
        <div>
          <label for="synopsis">Synopsis :</label>
          <textarea v-model="synopsis" required></textarea>
        </div>
        <div>
          <label for="award">Note :</label>
          <input type="number" v-model="awards">
        </div>
          <!--<div>
          <label for="genre">Genre :</label>
          <select v-model="genre" required>
            <option v-for="category in categories" :key="category.id" :value="category.title">
              {{ category.title }}
            </option>
          </select>
        </div>-->
        <!--<div>
          <label for="actors">Acteurs :</label>
          <select v-model="actors" required>
            <option v-for="actor in actors" :key="actor.id" :value="actor.firstname">
              {{ actor.lastname }} {{ actor.firstname }}
            </option>
          </select>
        </div>-->
        <button type="submit">Ajouter le film</button>
      </form>
    </div>
  </div>
</template>

<script>
import { addMovie } from '@/Services/MovieService';
import { getCategories } from '@/Services/CategoryService';
import { getActors } from '@/Services/ActorService';

export default {
  data() {
    return {
      title: '',
      releaseDate: '',
      genre: '',
      director: '',
      synopsis: '',
      awards:'',
      categories: [], // Stocker les catégories ici
      actors: []
    };
  },
  async mounted() {
    // Récupérer les catégories lorsque le composant est monté
    this.categories = await getCategories();
    this.actors = await getActors();
  },
  methods: {
    async submitForm() {
      const newMovie = {
        title: this.title,
        releaseDate: this.releaseDate,
        director: this.director,
        synopsis: this.synopsis,
        awards:this.entries,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      try {
        await addMovie(newMovie);
        this.resetForm();
        alert('Film ajouté avec succès !');
        await this.$router.push({ name: 'movies' });
      } catch (error) {
        if (error.response) {
          console.error('Erreur lors de l\'ajout du film:', error.response.data);
        } else {
          console.error('Erreur lors de l\'ajout du film:', error);
        }
      }
    },
    resetForm() {
      this.title = '';
      this.releaseDate = '';
      this.genre = '';
      this.director = '';
      this.synopsis = '';
      this.poster = '';
    },
    validateDate(field) {
      const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/; // Format JJ-MM-AAAA
      const date = this[field];
      if (!regex.test(date)) {
        console.error(`${field} est au format invalide. Utilisez JJ-MM-AAAA.`);
      }
    },
    formatDateToISO(dateString) {
      const [day, month, year] = dateString.split('-');
      const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
      return date.toISOString();
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
