<script >
import {defineComponent} from "vue";
import HeaderComponent from "@/components/Header.vue";

export default defineComponent({
  components: {HeaderComponent}
})
</script>

<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
  </div>
</template>

<style>
h1, h2, form, .searchInput {
  margin-left: 50px;
}

h2 {
  padding-top: 50px;
}
</style>