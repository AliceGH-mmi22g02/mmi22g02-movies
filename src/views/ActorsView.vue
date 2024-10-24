<template>
  <div>
    <div class="search-container">
      <h1>Actors</h1>
      <input type="text" v-model="searchQuery" placeholder="Rechercher par nom" class="searchInput" />
      <button @click="addActor" class="addButton">Add actor</button>
    </div>

    <div class="actors-list">
      <ActorCard v-for="actor in filteredActors" :key="actor.id" :actor="actor" @click="handleActorClick(actor)" />
    </div>
  </div>
</template>

<script>
import { getActors, handleActorClick } from '@/services/ActorService';
import ActorCard from '../components/ActorCard.vue';

export default {
  components: { ActorCard },
  data() {
    return {
      actors: [],
      searchQuery: ''
    };
  },
  async created() {
    this.actors = await getActors();
  },
  computed: {
    filteredActors() {
      return this.actors.filter(actor =>
          actor.lastname.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    handleActorClick(actor) {
      handleActorClick(actor, this.$router);
    },
    addActor() {
      this.$router.push({ name: 'AddActor' });
    }
  }
};
</script>

<style>
.actors-list {
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