<template>
  <div>
    <div class="search-container">
      <h1>Categories</h1>
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher par titre"
          class="searchInput"
      />
      <button @click="addCategory" class="addButton">Add category</button>
    </div>

    <div class="categories-list">
      <CategoryCard
          v-for="category in filteredCategories"
          :key="category.id"
          :category="category"
          @delete-category="handleCategoryDelete"
      />
    </div>
  </div>
</template>

<script>
import { getCategories, delCategory } from '@/Services/CategoryService'; // Assumes you have a CategorieService
import CategoryCard from '@/components/CategoryCard.vue'; // Adjust this to your actual component name

export default {
  components: { CategoryCard },
  data() {
    return {
      categories: [],
      searchQuery: ''
    };
  },
  async created() {
    this.categories = await getCategories(); // Fetch categories when component is created
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category =>
          category.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    addCategory() {
      // Redirect to the add category page
      this.$router.push({ name: 'AddCategory' });
    },
    handleCategoryDelete(category) {
      try {
        if (category.movies.length > 0) {
          alert('Vous ne pouvez pas supprimer cette categorie.');
        } else {
          delCategory(category.id);
          alert('Categorie supprimer avec succès !');

        }
      }  catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    }
  }
};
</script>

<style scoped>
.categories-list {
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
