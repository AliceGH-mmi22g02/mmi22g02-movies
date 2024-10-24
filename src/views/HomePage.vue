<template>
  <div>
    <h1>Home</h1>

    <h2>Movies</h2>
    <div class="movies-list">
      <MovieCard
          v-for="movie in movies.slice(0, 4)"          :key="movie.id"
          :movie="movie"
          @click="() => handleMovieClick(movie)"
      />
    </div>

    <h2>Actors</h2>
    <div class="actors-list">
      <ActorCard
          v-for="movie in actors.slice(0, 4)"
          :key="actor.id"
          :actor="actor"
          @click="() => handleActorClick(actor)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import MovieCard from '@/components/MovieCard.vue';
import ActorCard from "@/components/ActorCard.vue";
import { getLatestMovies } from '@/Services/MovieService';
import { getLatestActors } from '@/Services/ActorService';

// Variables
const movies = ref([]);
const actors = ref([]);

// Fonction pour gérer le clic sur un film
const handleMovieClick = (movie: any) => {
  // Utilisation de router pour naviguer vers la page de détails du film
  router.push({ name: 'MovieInfo', params: { id: movie.id } });
};

// Fonction pour gérer le clic sur un acteur
const handleActorClick = (actor: any) => {
  // Utilisation de router pour naviguer vers la page de détails de l'acteur
  router.push({ name: 'ActorInfo', params: { id: actor.id } });
};

// Appel pour récupérer les 4 derniers films et acteurs lors du montage du composant
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
