<template>
  <q-page class="flex flex-center">
    <q-form
      class="q-pa-md q-gutter-sm"
      @submit="enviar"
      style="max-width: 400px"
    >
    <img src="statics/imagensApp/logo_encontraja.png">
    <q-input filled
        v-model="email"
        label="Login"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Digite um login']"
        />
      <br>
      <q-input v-model="senha"
      filled label="Senha"
      type="password"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Digite uma senha']" />
      <br>
      <div align="center">
        <q-btn label="Entrar" type="submit" color="primary"/>
      </div>
      </q-form>
  </q-page>
</template>

<style>
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: null,
      senha: null,
      token: null,
    };
  },
  methods: {
    enviar() {
      axios.get(`http://localhost:8799/api/validarLogin/${this.email},${this.senha}`)
        .then((response) => {
          if (response.data.login === 'confirmado') {
            this.token = response.data.token;
            localStorage.setItem('token', this.token);
            this.mostrarNotificacaoSucesso();
            this.$router.push('/menuprincipal');
          } else {
            this.mostrarNotificacaoErro();
          }
        });
    },
    mostrarNotificacaoSucesso() {
      this.$q.notify({
        color: 'green',
        message: 'Login efetuado com sucesso!',
      });
    },
    mostrarNotificacaoErro() {
      this.$q.notify({
        color: 'red',
        message: 'Login não efetuado! Verique sua conexão e credenciais.',
      });
    },
  },
};
</script>
