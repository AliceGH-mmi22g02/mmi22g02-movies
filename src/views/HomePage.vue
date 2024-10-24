<template>
  <div>
    <h1>Home</h1>

    <h2>Movies</h2>
    <div class="movies-list">
      <MovieCard
          v-for="movie in movies.slice(0, 4)"
          :key="movie.id"
          :movie="movie"
          @click="() => movieClickHandler(movie)"
      />
    </div>

    <h2>Actors</h2>
    <div class="actors-list">
      <ActorCard
          v-for="actor in actors.slice(0, 4)"
          :key="actor.id"
          :actor="actor"
          @click="() => actorClickHandler(actor)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import MovieCard from '@/components/MovieCard.vue';
import ActorCard from "@/components/ActorCard.vue";
import { getLatestMovies, handleMovieClick } from '@/services/MovieService';
import { getLatestActors, handleActorClick } from '@/services/ActorService';

// Variables
const movies = ref([]);
const actors = ref([]);

// Fonction pour gérer le clic sur un film
const movieClickHandler = (movie: any) => {
  handleMovieClick(movie, router);
};

// Fonction pour gérer le clic sur un acteur
const actorClickHandler = (actor: any) => {
  handleActorClick(actor, router);
};

// Appel pour récupérer les derniers films et acteurs lors du montage du composant
onMounted(async () => {
  try {
    movies.value = await getLatestMovies();
    actors.value = await getLatestActors();
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
});
</script>

<style>
</style>