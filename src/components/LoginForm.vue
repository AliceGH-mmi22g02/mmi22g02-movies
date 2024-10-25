<template>
  <div class="loginForm">
    <form @submit.prevent="onSubmitLogin">
      <label for="email"><b>Email</b></label>
      <input
          type="text"
          v-model="email"
          placeholder="Entrez votre courriel"
          id="email"
          name="email"
          required
      />

      <label for="psw"><b>Mot de passe</b></label>
      <input
          type="password"
          v-model="password"
          placeholder="Entrez votre mot de passe"
          id="psw"
          name="psw"
          required
      />

      <button type="submit">Soumettre</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    async onSubmitLogin() {
      this.error = null;
      /*try {
        /const response = await UserService.login({ email: this.email, password: this.password });
        const session = useSession();
        session.login({ user: response.user, token: response.token });
        this.$router.push('/search');
      } catch (error) {
        this.error = 'Échec de la connexion : ' + error.message;
      }*/
    }
  }
};
</script>

<style scoped>
input {
  max-width: 500px;
}
button {
  max-width: 150px;
}
</style>
