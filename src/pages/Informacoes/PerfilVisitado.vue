<template>
  <q-page class="flex flex-center">
  <div class="q-pa-md">
  <div class="text-h6">Perfil visitado</div>
    <q-card class="perfil">
        <img v-bind:src="imagemAtualPessoaVisitada">

      <q-card-section>
        <div class="text-h6">{{pessoaInformacao.nomePessoa}}</div>
        <div class="text-subtitle2">{{pessoaInformacao.criadoEm}}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2">Descrição</div>
        <span class="descricao">{{pessoaInformacao.descricao}}</span>
      </q-card-section>
    </q-card>

  </div>
  </q-page>
</template>

<style>
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
      pessoaInformacao: [],
      imagemAtualPessoaVisitada: null,
      idPessoa: null,
    };
  },
  created() {
    this.idPessoa = this.$route.params.id;
    this.carregaImagemPerfilVisitado();
    this.carregarPessoaInformacao();
  },
  methods: {
    carregarPessoaInformacao() {
      axios.get(`http://localhost:8799/api/perfilIdUsuario/null,${this.idPessoa}`)
        .then((response) => {
          this.pessoaInformacao = response.data;
        }).catch((error) => {
          console.log(error);
        });
    },
    carregaImagemPerfilVisitado() {
      axios.get(`http://localhost:8799/api/mostrarImagemPerfilVisitado/${this.idPessoa}`)
        .then((response) => {
          this.imagemAtualPessoaVisitada = response.data;
        }).catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
