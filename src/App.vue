<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import { useSession } from "@/stores/session"; // Assurez-vous que le chemin est correct
import { mapState, mapActions } from "pinia";

export default {
  components: { HeaderComponent },
  computed: {
    ...mapState(useSession, ["loggedIn", "user"])
  },
  methods: {
    ...mapActions(useSession, ["logout"])
  }
};
</script>

<style>
h1, h2, form, .searchInput {
  margin-left: 50px;
}

h2 {
  padding-top: 50px;
}
</style>
