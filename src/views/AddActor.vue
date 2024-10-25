<template>
  <div id="body">
    <h1>Add Actor</h1>
    <div id="form-container">
      <form @submit.prevent="submitForm">
        <div>
          <label for="firstname">Prénom :</label>
          <input type="text" v-model="firstname" required />
        </div>
        <div>
          <label for="lastname">Nom :</label>
          <input type="text" v-model="lastname" required />
        </div>
        <div>
          <label for="nationality">Nationalité :</label>
          <input type="text" v-model="nationality" required />
        </div>
        <div>
          <label for="dob">Date de Naissance (JJ-MM-AAAA) :</label>
          <input type="text" v-model="dob" @input="validateDate('dob')" required />
        </div>
        <div>
          <label for="deathDate">Date de décès (JJ-MM-AAAA) :</label>
          <input type="text" v-model="deathDate" @input="validateDate('deathDate')" />
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
import { addActor } from '@/Services/ActorService';

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      nationality: '',
      dob: '',
      deathDate: '',
      awards: 0,
      bio: '',
      media: '',
      gender: 'male'
    };
  },
  methods: {
    async submitForm() {
      const newActor = {
        firstname: this.firstname,
        lastname: this.lastname,
        nationality: this.nationality,
        dob: this.formatDateToISO(this.dob),
        deathDate: this.deathDate ? this.formatDateToISO(this.deathDate) : null,
        awards: parseInt(this.awards) || 0,
        bio: this.bio,
        media: this.media,
        gender: this.gender,
      };
      try {
        await addActor(newActor);
        this.resetForm();
        alert('Acteur ajouté avec succès !');
        await this.$router.push({ name: 'actors' });
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
      this.nationality = '';
      this.dob = '';
      this.deathDate = '';
      this.awards = 0;
      this.bio = '';
      this.media = '';
      this.gender = 'male';
    },
    validateDate(field) {
      const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/; // Format JJ-MM-AAAA
      const date = this[field];
      if (!regex.test(date)) {
        console.error(`${field} est au format invalide. Utilisez JJ-MM-AAAA.`);
      }
    },
    formatDateToISO(dateString) {
      const [day, month, year] = dateString.split('-');
      const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
      return date.toISOString();
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