<template>
  <div id="movieInfo" v-if="movie">
    <h1>Movie n° {{ movie.id }}</h1>
    <MovieCard :movie="movie"/>
    <h2>Actors :</h2>
    <ActorCard v-for="actor in actors" :key="actor.id" :actor="actor" />
  </div>
</template>

<script>
import { getMovieById } from '@/services/MovieService';
import { getActorById } from '@/services/ActorService';
import MovieCard from "@/components/MovieCard.vue";
import ActorCard from "@/components/ActorCard.vue";

export default {
  components: {ActorCard, MovieCard},
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