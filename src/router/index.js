import VueRouter from 'vue-router';
import Home from '../views/HomePage.vue';
import Movies from '../views/MoviesView.vue';
import Actors from '../views/ActorsView.vue';
import Categories from '../views/CategoriesView.vue';
import ActorInfo from '../views/ActorInfo.vue';
import AddActor from '../views/AddActor.vue';
import MovieInfo from '../views/MovieInfo.vue';
import AddMovie from '../views/AddMovie.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue'
import AddCategory from "@/views/AddCategory.vue";
// import { useSession } from '../stores/session';

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies,
    },
    {
      path: '/actors',
      name: 'actors',
      component: Actors,
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
    },
    {
      path: '/addCategory',
      name: 'AddCategory',
      component: AddCategory,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/:id',
      name: 'ActorInfo',
      component: ActorInfo,
    },
    {
      path: '/addActor',
      name: 'AddActor',
      component: AddActor,
    },
    {
      path: '/:id',
      name: 'MovieInfo',
      component: MovieInfo,
    },
    {
      path: '/addMovie',
      name: 'AddMovie',
      component: AddMovie,
    },
  ],
});
export default router;
