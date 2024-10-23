<template>
  <div id="actorInfo" v-if="actor">
    <h1>Actor n° {{ actor.id }}</h1>
    <ActorCard :actor="actor"/>
  </div>
</template>

<script>
import { getActorById } from '@/Services/ActorService';
import ActorCard from "@/components/ActorCard.vue";

export default {
  components: {ActorCard},
  data() {
    return {
      actor: null
    };
  },
  async created() {
    const actorId = this.$route.params.id;
    this.actor = await getActorById(actorId);
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