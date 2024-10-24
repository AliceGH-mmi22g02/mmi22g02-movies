<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="movies">Movies</router-link>
        </li>
        <li>
          <router-link to="actors">Actors</router-link>
        </li>
        <li>
          <router-link to="categories">Categories</router-link>
        </li>
        <li>
          <router-link to="login">Login</router-link>
        </li>
        <li>
          <router-link to="register">Create user</router-link>
        </li>
      </ul>
    </nav>

  </div>
</template>
<script>
export default {
  name: 'HeaderComponent', // Nomme le composant
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
