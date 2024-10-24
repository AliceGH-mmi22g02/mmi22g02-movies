<template>
  <div class="categoryCard">
    <h3>{{ category.title }}</h3>
    <button @click="deleteCategory" class="addButton">Delete category</button>
  </div>
</template>

<script>
export default {
  props: {
    category: Object
  },
};
</script>

<style scoped>
.categoryCard {
  background-color: #e1d3ff;
  border: 1px solid #ddd;
  padding: 15px;
  width: 80%;
  margin: 50px;
  cursor: pointer;
}

.categoryCard:hover {
  background-color: #cab2ff;
}
</style>