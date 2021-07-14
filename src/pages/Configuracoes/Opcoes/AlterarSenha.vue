<template>
  <q-page class="flex flex-center">
    <q-form
      class="q-gutter-md"
      @submit="alterar"
      v-if="cadastrado == true"
      >

      <q-input v-model="senhaAntiga"
      filled label="Antiga senha"
      type="password"/>

      <q-input v-model="senhaNova"
      filled label="Nova senha"
      type="password"/>

      <div>
        <q-btn label="Alterar" type="submit" color="primary"/>
      </div>
      </q-form>
     <span v-if="!cadastrado">Você precisa estar logado, para alterar uma
       senha!
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
      senhaAntiga: null,
      senhaNova: null,
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
      axios.post('http://localhost:8799/api/alterarSenha', {
        token: this.token,
        senhaAntiga: this.senhaAntiga,
        senhaNova: this.senhaNova,
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
