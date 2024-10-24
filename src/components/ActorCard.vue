<template>
  <div class="actorCard" @click="handleClick"> <!-- Gère le clic ici -->
    <img :src="actor.media" alt="Photo de l'acteur" />
    <h3>{{ actor.lastname }} {{ actor.firstname }}</h3>
    <p>Date de naissance : {{ formattedBirthDate }}</p>
    <p>Nationalité : {{ actor.nationality }}</p>
    <p>Awards : {{ actor.awards }}</p>
    <p>Bio :</p>
    <p>{{ actor.bio }}</p>
  </div>
</template>

<script>
export default {
  props: {
    actor: Object
  },
  computed: {
    formattedBirthDate() {
      return new Date(this.actor.dob).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  methods: {
    handleClick() {
      this.$emit('click', this.actor);
    }
  }
};
</script>


<style scoped>
.actorCard {
  background-color: #e1d3ff;
  border: 1px solid #ddd;
  padding: 15px;
  width: 80%;
  margin: 50px;
}

.actorCard:hover {
  background-color: #cab2ff;
}

.actorCard img {
  width: 150px;
  height: 150px;
  margin-top: 40px;
  object-fit: cover;
  margin-bottom: 15px;
}

.actorCard h3 {
  font-size: 1.4em;
  color: #333;
  margin-bottom: 10px;
}

.actorCard p {
  color: #666;
  font-size: 1em;
  margin: 5px 0;
}
</style>