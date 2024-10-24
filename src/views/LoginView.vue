<template>
  <div>
    <h1>Login</h1>
    <p>Remplissez ce formulaire pour vous connecter.</p>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm
  }
};
</script>

<style>
/* Styles existants */
</style>