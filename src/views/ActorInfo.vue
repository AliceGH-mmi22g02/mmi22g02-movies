<template>
  <div id="actorInfo" v-if="actor">
    <h1>Actor n° {{ actor.id }}</h1>
    <button @click="deleteActor" class="addButton">Delete actor</button>
    <ActorCard :actor="actor"/>
    <h2>Movies :</h2>
    <MovieCard
        v-for="movie in movies"
        :key="movies.id"
        :movie="movie"
        @click="handleMovieClick(movie)"
    />
  </div>
</template>

<script>
import {delActor, getActorById} from '@/Services/ActorService';
import {getMovieById, handleMovieClick} from '@/Services/MovieService';
import ActorCard from "@/components/ActorCard.vue";
import MovieCard from "@/components/MovieCard.vue";
export default {
  methods: {

    deleteActor() {
      try {
          delActor(this.actor.id);
          alert('Film supprimer avec succès !');
          this.$router.push({ name: '/' });
          window.location.reload();
      }  catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    },
    handleMovieClick(movie) {
      handleMovieClick(movie, this.$router);
    },

  },
  components: {ActorCard, MovieCard, handleMovieClick},
  data() {
    return {
      actor: null,
      movies: []
    };
  },
    async created() {
      const actorId = this.$route.params.id;
      this.actor = await getActorById(actorId);

      const moviePromises = this.actor.movies.map(async actorUrl => {
        const movieId = actorUrl.split('/').pop(); // Extrait l'ID de l'URL
        return getMovieById(movieId);
      });
      this.movies = await Promise.all(moviePromises);
    },

  computed: {
    formattedBirthDate() {
      return this.actor ? new Date(this.actor.dob).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : '';
    }
  }
};
</script>

<style>
</style>