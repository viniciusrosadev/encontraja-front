<template>
  <q-page class="flex flex-center">
     <q-form
      class="q-gutter-md"
      @submit="alterar"
      v-if="cadastrado == true"
      >
      <q-input
        filled
        v-model="emailAntigo"
        label="E-mail antigo"
        hint="Digite seu antigo e-mail"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Escreva seu antigo email.']"
      />

       <q-input
        filled
        v-model="emailNovo"
        label="Novo e-mail"
        hint="Digite seu novo e-mail"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Escreva seu email.']"
      />

      <div>
        <q-btn label="Alterar" type="submit" color="primary"/>
      </div>
     </q-form>
     <span v-if="!cadastrado">Você precisa estar logado, para alterar um
       email!
     </span>
  </q-page>
</template>

<style>
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      token: null,
      emailAntigo: null,
      emailNovo: null,
      cadastrado: false,
    };
  },
  created() {
    this.token = localStorage.getItem('token');

    if (this.token) {
      this.cadastrado = true;
    }
  },
  methods: {
    alterar() {
      axios.post('http://localhost:8799/api/alterarEmail', {
        token: this.token,
        emailAntigo: this.emailAntigo,
        emailNovo: this.emailNovo,
      }).then((response) => {
        const { status } = response;

        if (status === 200) {
          this.$router.push('/');
        }
      });
    },
  },
};
</script>
