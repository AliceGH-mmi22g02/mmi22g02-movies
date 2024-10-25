<template>
  <div id="movieInfo" v-if="movie">
    <h1>Movie n° {{ movie.id }}</h1>
    <button @click="deleteMovie" class="addButton">Delete movie</button>
    <MovieCard :movie="movie"/>
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
import {getMovieById, delMovie } from '@/Services/MovieService';
import {getActorById, handleActorClick} from '@/Services/ActorService';
import MovieCard from "@/components/MovieCard.vue";
import ActorCard from "@/components/ActorCard.vue";
import CategoryCard from "@/components/CategoryCard.vue";
export default {
  methods: {
    deleteMovie() {
      try {
          delMovie(this.movie.id);
          alert('Film supprimer avec succès !');
          this.$router.push({ name: '/' });
          window.location.reload();
      }  catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    },
    handleActorClick(actor) {
      handleActorClick(actor, this.$router);
    },
  },
  components: {CategoryCard, ActorCard, MovieCard},
  data() {
    return {
      movie: null,
      actors: [],
    };
  },
  async created() {
    const movieId = this.$route.params.id;
    this.movie = await getMovieById(movieId);

    const actorPromises = this.movie.actors.map(actorUrl => {
      const actorId = actorUrl.split('/').pop(); // Extrait l'ID de l'URL
      return getActorById(actorId);
    });

    this.actors = await Promise.all(actorPromises);
  },
};
</script>

<style>

</style>