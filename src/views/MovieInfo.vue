<template>
  <div id="movieInfo" v-if="movie">
    <h1>Movie n° {{ movie.id }}</h1>
    <div class="button-container">
      <button @click="deleteMovie" class="addButton">Delete movie</button>
      <button @click="toggleCodeDisplay" class="editButton">Edit movie</button>
    </div>
    <pre v-if="showCode" v-html="htmlCode"></pre>
    <MovieCard :movie="movie" />
    <h2>Actors :</h2>
    <ActorCard
      v-for="actor in actors"
      :key="actor.id"
      :actor="actor"
      @click="handleActorClick(actor)"
    />
  </div>
</template>

<script>
import { getMovieById, delMovie, editMovie } from "@/Services/MovieService";
import { getActorById, getActors, handleActorClick } from "@/Services/ActorService";
import MovieCard from "@/components/MovieCard.vue";
import ActorCard from "@/components/ActorCard.vue";
import CategoryCard from "@/components/CategoryCard.vue";
import { getCategories } from "@/Services/CategoryService";

export default {
  components: { CategoryCard, ActorCard, MovieCard },
  data() {
    return {
      title: '',
      releaseDate: '',
      genre: '',
      director: '',
      synopsis: '',
      awards: '',
      categories: [],
      actors: [],
      htmlCode: `
      <div id="form-container">
        <form @submit.prevent="submitForm">
          <div>
            <label for="title">Titre :</label>
            <input type="text" v-model="title" :placeholder="movie.title" required />
          </div>
          <div>
            <label for="releaseDate">Date de Sortie (JJ-MM-AAAA) :</label>
            <input type="date" v-model="releaseDate" :placeholder="movie.releaseDate" required />
          </div>
          <div>
            <label for="director">Réalisateur :</label>
            <input type="text" v-model="director" :placeholder="movie.director" required />
          </div>
          <div>
            <label for="synopsis">Synopsis :</label>
            <textarea v-model="synopsis" :placeholder="movie.synopsis" required></textarea>
          </div>
          <div>
            <label for="awards">Note :</label>
            <input type="number" v-model="awards" :placeholder="movie.awards" />
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
          <button type="submit">Editer le film</button>
        </form>
      </div>
      `,
      movie: null,
      showCode: false
    };
  },
  methods: {
    async deleteMovie() {
      try {
        await delMovie(this.movie.id);
        alert('Film supprimé avec succès !');
        this.$router.push({ name: 'movies' });
        window.location.reload();
      } catch (error) {
        console.error('Erreur lors de la suppression du film:', error);
      }
    },
    toggleCodeDisplay() {
      this.showCode = !this.showCode;
    },
    handleActorClick(actor) {
      handleActorClick(actor, this.$router);
    },
    async submitForm() {
      const updatedMovie = {
        title: this.title || this.movie.title,
        releaseDate: this.releaseDate || this.movie.releaseDate,
        director: this.director || this.movie.director,
        synopsis: this.synopsis || this.movie.synopsis,
        awards: parseInt(this.awards) || this.movie.awards,
        updatedAt: new Date().toISOString(),
      };
      try {
        await editMovie(this.movie.id, updatedMovie);
        alert('Film modifié avec succès !');
        this.resetForm();
        await this.$router.push({ name: 'movies' });
      } catch (error) {
        console.error('Erreur lors de la modification du film:', error);
      }
    },
    resetForm() {
      this.title = '';
      this.releaseDate = '';
      this.genre = '';
      this.director = '';
      this.synopsis = '';
      this.awards = '';
    },
    validateDate(field) {
      const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
      const date = this[field];
      if (!regex.test(date)) {
        console.error(`${field} est au format invalide. Utilisez JJ-MM-AAAA.`);
      }
    }
  },
  async created() {
    const movieId = this.$route.params.id;
    this.movie = await getMovieById(movieId);

    const actorPromises = this.movie.actors.map(actorUrl => {
      const actorId = actorUrl.split('/').pop();
      return getActorById(actorId);
    });
    this.actors = await Promise.all(actorPromises);
  },
  async mounted() {
    this.categories = await getCategories();
    this.actors = await getActors();
  }
};
</script>

<style>
.button-container {
  display: flex;
  gap: 10px;
  margin-left: 40px;
}
</style>
