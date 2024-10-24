<template>
  <div>
    <div class="search-container">
      <h1>Movies</h1>
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher par titre"
          class="searchInput"
      />
      <button @click="addMovie" class="addButton">Add movie</button>
    </div>

    <div class="movies-list">
      <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
          @click="handleMovieClick(movie)"
      />
    </div>
  </div>
</template>

<script>
import { getMovies, handleMovieClick } from '@/services/MovieService';
import MovieCard from '../components/MovieCard.vue';

export default {
  components: { MovieCard },
  data() {
    return {
      movies: [],
      searchQuery: ''
    };
  },
  async created() {
    await this.fetchMovies();
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(movie =>
          movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchMovies() {
      try {
        this.movies = await getMovies();
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
        // Gérer l'affichage d'un message d'erreur à l'utilisateur si nécessaire
      }
    },
    handleMovieClick(movie) {
      handleMovieClick(movie, this.$router);
    },
    addMovie() {
      // Rediriger vers la page d'ajout d'un film
      this.$router.push({ name: 'AddMovie' });
    }
  }
};
</script>

<style>
.movies-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.searchInput {
  padding: 8px;
}

.addButton {
  margin-left: 20px;
  padding: 10px 15px;
  background-color: #ffcefd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>