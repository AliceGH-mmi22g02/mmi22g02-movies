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
  methods: {
    deleteCategory() {
      this.$emit('delete-category', this.category); // Émet un événement vers le parent
    }
  }
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
