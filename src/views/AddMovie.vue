<template>
  <div id="body">
    <h1>Add actor</h1>
    <div id="form-container">
      <form @submit.prevent="submitForm">
        <div>
          <label for="firstname">Nom :</label>
          <input type="text" v-model="lastname" required />
        </div>
        <div>
          <label for="lastname">Prénom :</label>
          <input type="text" v-model="firstname" required />
        </div>
        <div>
          <label for="nationality">Nationalité :</label>
          <input type="text" v-model="nationality" required />
        </div>
        <div>
          <label for="dob">Date de Naissance :</label>
          <input type="datetime-local" v-model="dob" required />
        </div>
        <div>
          <label for="deathDate">Date de décès :</label>
          <input type="datetime-local" v-model="deathDate" />
        </div>
        <div>
          <label for="awards">Awards :</label>
          <input type="number" v-model="awards" min="0" />
        </div>
        <div>
          <label for="bio">Biographie :</label>
          <textarea v-model="bio" required></textarea>
        </div>
        <div>
          <label for="media">Média :</label>
          <input type="url" v-model="media" required />
        </div>
        <div>
          <label for="gender">Genre :</label>
          <select v-model="gender" required>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>

        <button type="submit">Ajouter l'acteur</button>
      </form>
    </div>
  </div>
</template>

<script>
import { addActor } from '@/services/ActorService'; // Vérifiez que le chemin est correct

export default {
  data() {
    return {
      firstname: '', // Prénom
      lastname: '', // Nom
      dob: '', // Date de Naissance
      nationality: '', // Nationalité
      awards: 0, // Récompenses
      bio: '', // Biographie
      media: '', // Média
      gender: 'female', // Valeur par défaut pour le genre
      deathDate: '' // Date de décès
    };
  },
  methods: {
    async submitForm() {
      const newActor = {
        firstname: this.firstname,
        lastname: this.lastname,
        dob: new Date(this.dob).toISOString(), // Format ISO 8601
        nationality: this.nationality,
        awards: this.awards,
        bio: this.bio,
        media: this.media,
        gender: this.gender,
        deathDate: this.deathDate ? new Date(this.deathDate).toISOString() : null,
        createdAt: new Date().toISOString(), // Format ISO 8601
        updatedAt: new Date().toISOString(), // Format ISO 8601
        movies: [] // Assurez-vous d'inclure un tableau pour les films
      };

      // Affiche l'objet avant l'envoi
      console.log('Nouvel acteur à ajouter :', JSON.stringify(newActor, null, 2));

      try {
        await addActor(newActor);
        this.resetForm();
        this.$emit('actor-added');
      } catch (error) {
        if (error.response) {
          console.error('Erreur lors de l\'ajout de l\'acteur:', error.response.data);
        } else {
          console.error('Erreur lors de l\'ajout de l\'acteur:', error);
        }
      }
    },
    resetForm() {
      this.firstname = '';
      this.lastname = '';
      this.dob = '';
      this.nationality = '';
      this.awards = 0;
      this.bio = '';
      this.media = '';
      this.gender = 'female'; // Réinitialiser à la valeur par défaut
      this.deathDate = '';
    }
  }
};
</script>

<style>
#body {
  text-align: center;
  margin-top: 50px;
}

#form-container {
  display: flex;
  justify-content: center;
}

form {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input, textarea {
  padding: 8px;
  border-radius: 5px;
  border: solid 1px grey;
  margin-left: 20px;
}

button {
  margin-left: 20px;
  padding: 10px 15px;
  background-color: #ffcefd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
