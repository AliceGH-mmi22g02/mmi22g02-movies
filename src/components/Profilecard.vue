<template>
  <div>
    <h1>Profil de l'utilisateur</h1>
    <p>Email : {{ user.email }}</p>
    <p>Prénom : {{ user.firstname }}</p>
  </div>
</template>

<script>
import userService from '@/services/userService';

export default {
  data() {
    return {
      user: {
        email: '',
        firstname: '',
      },
    };
  },
  async created() {
    try {
      const currentUser = await userService.getCurrentUser();
      this.user = currentUser;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur connecté', error);
    }
  },
};
</script>
