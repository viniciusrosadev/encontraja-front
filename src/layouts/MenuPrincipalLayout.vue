<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-tabs align="center">
        <q-btn round
        @click="carregarPerfil"
        >
          <template>
          <q-avatar size="24px">
            <img v-bind:src="imagemAtual">
          </q-avatar>
         </template>
          </q-btn>
        <q-route-tab to="/menuprincipal">
          <span class="menuTexto">Principal</span>
        <template>
          <q-icon name="home" size = "24px"></q-icon>
        </template>
        </q-route-tab>
        <!-- Procurar -->
        <q-route-tab to="/pesquisa">
          <span class="menuTexto">Pesquisar</span>
        <template>
          <q-icon name="search" size = "24px"></q-icon>
        </template>
        </q-route-tab>
        <!-- Meus anúncios -->
        <q-route-tab to="/meusanuncios">
          <span class="menuTexto">Anúncios</span>
        <template>
          <q-icon name="chrome_reader_mode" size = "24px"></q-icon>
        </template>
        </q-route-tab>
        <!-- Configurações -->
        <q-route-tab to="/configuracoes">
          <span class="menuTexto">Configurações</span>
        <template>
          <q-icon name="developer_board" size = "24px"></q-icon>
        </template>
        </q-route-tab>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      token: null,
      imagemAtual: null,
    };
  },
  created() {
    this.token = localStorage.getItem('token');
    this.carregarImagemDePerfil();
  },
  methods: {
    carregarImagemDePerfil() {
      axios.get(`http://localhost:8799/api/mostrarImagemAvatarDePerfil/${this.token}`)
        .then((response) => {
          this.imagemAtual = response.data;
        });
    },
    carregarPerfil() {
      this.$router.push('/meuperfil');
    },
  },
};
</script>

<style>
  .menuTexto {
    font-weight: bold;
    font-size: 0.62em;
  }
</style>
