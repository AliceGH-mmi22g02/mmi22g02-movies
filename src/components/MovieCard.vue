<template>
  <div class="movieCard" @click="handleClick">
    <!--<img :src="movie.media" alt="Affiche du film" />-->
    <h3>{{ movie.title }}</h3>
    <p>Directeur : {{ movie.director }}</p>
    <p>Date de sortie : {{ formattedReleaseDate }}</p>
    <p>Durée : {{ movie.duration }} minutes</p>
    <p>Entrées : {{ movie.entries }}</p>
    <p>Note : {{ movie.rating }}/10</p>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  computed: {
    formattedReleaseDate() {
      const date = new Date(this.movie.releaseDate);
      return date.toLocaleDateString(); // Formate la date en fonction des paramètres régionaux
    },
    formattedActors() {
      return this.movie.actors ? this.movie.actors.join(', ') : ''; // Vérifie si les acteurs existent
    }
  },
  methods: {
    handleClick() {
      this.$emit('click', this.movie); // Émet un événement avec le film lorsqu'il est cliqué
    }
  }
};
</script>

<style scoped>
.movieCard {
  background-color: #e1d3ff;
  border: 1px solid #ddd;
  padding: 15px;
  width: 80%;
  margin: 50px auto; /* Centrer horizontalement */
  cursor: pointer;
  transition: background-color 0.3s; /* Ajoute une transition pour un effet fluide */
}

.movieCard:hover {
  background-color: #cab2ff; /* Change la couleur au survol */
}

.movieCard img {
  width: 150px;
  height: 150px;
  margin-top: 40px;
  object-fit: cover;
  margin-bottom: 15px;
}

.movieCard h3 {
  font-size: 1.4em;
  color: #333;
  margin-bottom: 10px;
}

.movieCard p {
  color: #666;
  font-size: 1em;
  margin: 5px 0;
}
</style>