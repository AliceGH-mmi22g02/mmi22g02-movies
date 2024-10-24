<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/movies">Movies</router-link>
        </li>
        <li>
          <router-link to="/actors">Actors</router-link>
        </li>
        <li>
          <router-link to="/categories">Categories</router-link>
        </li>
        <li>
          <div v-if="loggedIn">
            <router-link to="/profile">Profile</router-link>

            <span>{{ user.email }}</span> <!-- Affiche l'email de l'utilisateur -->
            <button @click="onLogout">Se déconnecter</button>
          </div>
          <div v-else>
            <router-link to="/register">Create user</router-link>
            <router-link to="/login">Login</router-link>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useSession } from "@/stores/session"; // Assurez-vous que le chemin est correct

export default {
  computed: {
    ...mapState(useSession, ["loggedIn", "user"]),
  },
  methods: {
    ...mapActions(useSession, ["logout"]),
    onLogout() {
      this.logout(); // Appel de l'action logout
      this.$router.push("/login"); // Redirection vers la page de login
    },
  },
};
</script>

<style>
nav {
  background-color: #4a4369;
  padding: 10px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  margin-right: 20px;
}

li:last-child {
  margin-right: 0;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 5px;
  transition: background-color 0.3s;
}

a:hover {
  background-color: #262235;
}
</style>