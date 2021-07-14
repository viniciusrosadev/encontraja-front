<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md q-gutter-sm" v-if="cadastrado == false">
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Entre em nossa comunidade</div>
        </q-card-section>

        <q-card-actions vertical align="center">
          <q-btn flat @click="cadastrar">CADASTRAR</q-btn>
          <q-btn flat @click="entrar">ENTRAR</q-btn>
        </q-card-actions>
      </q-card>
    </div>

  <div class="q-pa-md" v-if="cadastrado == true"
  transaction="fade">
  <div class="text-h6">Meu perfil</div>
    <q-card class="perfil">
        <img v-bind:src="imagemAtual"
        transaction="fade">

      <q-card-section>
        <div class="text-h6">{{pessoaInformacao.nomePessoa}}</div>
        <div class="text-subtitle2">Nascido em {{pessoaInformacao.dataNascimento}}</div>
        <div class="text-subtitle2">Sexo: {{pessoaInformacao.sexo}}</div>
        <div class="text-subtitle2">{{pessoaInformacao.criadoEm}}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2">Descrição</div>
        <span class="descricao">{{pessoaInformacao.descricao}}</span>
      </q-card-section>
    </q-card>
  <br>
  <q-btn align="center"
  label="Sair" @click="logout" class="text-primary"/>
  </div>
  </q-page>
</template>

<style>
.descricao {
    word-wrap: break-word;
}
.perfil {
  max-width: 300px;
}
.perfil img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      token: null,
      cadastrado: false,
      imagemAtual: null,
      pessoaInformacao: [],
    };
  },
  created() {
    this.token = localStorage.getItem('token');

    if (this.token) {
      this.cadastrado = true;
      this.carregarImagemDePerfil();
      this.carregarInformacoesPessoa();
    }
  },
  methods: {
    entrar() {
      this.$router.push('/entrar');
    },
    cadastrar() {
      this.$router.push('/cadastrarpessoa');
    },
    carregarImagemDePerfil() {
      axios.get(`http://localhost:8799/api/mostrarImagemAvatarDePerfil/${this.token}`)
        .then((response) => {
          this.imagemAtual = response.data;
        }).catch((error) => {
          console.log(error);
        });
    },
    carregarInformacoesPessoa() {
      axios.get(`http://localhost:8799/api/perfilIdUsuario/${this.token},null`)
        .then((response) => {
          this.pessoaInformacao = response.data;
        }).catch((error) => {
          console.log(error);
        });
    },
    logout() {
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>
