<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-carousel
        v-model="contadorImagensAnuncio"
        transition-prev="rotate"
        transition-next="rotate"
        swipeable
        animated
        navigation
        height="250px"
        class="rounded-borders no-wrap"
      >
        <q-carousel-slide
          v-bind:name="imagem.id"
          v-for="imagem in imagensAnuncio" :key="imagem.id"
          class="no-padding">
          <img :src="imagem.base64" />
        </q-carousel-slide>
      </q-carousel>

      <q-card-section>
        <q-card-actions>
          <q-btn flat round color="primary" @click="compartilharDialog = true" icon="share" />
          <q-btn flat round color="primary" @click="contatoDialog = true" icon="assignment_ind" />
          <q-btn flat round color="primary" @click="cidadesAtendimentoDialog = true" icon="map" />
          <q-btn flat round color="primary" @click="carregarPerfilAnuncio" icon="person_pin" />
        </q-card-actions>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{this.tituloAnuncio}}</div>
        <div class="text-subtitle2">Criado em: {{this.criadoEm}}, por: {{ this.nomePessoa }}</div>
      </q-card-section>

      <q-card-section>
        <span>Descrição:</span>
        <br>
        {{this.descricao}}
      </q-card-section>
    </q-card>

    <!--Contato dialog-->
    <q-dialog v-model="contatoDialog">
      <div class="bg-white">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>Contato</q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Fechar</q-tooltip>
          </q-btn>
        </q-toolbar>
        <q-list bordered separator>
          <q-item clickable v-ripple
          v-if="telefone && !emailContato">
            <q-item-section avatar>
              <q-icon name="settings_cell"/>
            </q-item-section>
            <q-item-section>{{this.telefone}}</q-item-section>
          </q-item>
          <q-item clickable v-ripple
          v-if="emailContato && !telefone">
            <q-item-section avatar>
              <q-icon name="mail"/>
            </q-item-section>
            <q-item-section>{{this.emailContato}}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-dialog>

    <!--  Compartilhar dialog  -->

    <q-dialog v-model="compartilharDialog">
      <div class="bg-white">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>Compartilhar - URL</q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Fechar</q-tooltip>
          </q-btn>
        </q-toolbar>
        <q-input v-model="urlAnuncio" filled
                 type="url" hint="Copie o link e passe para alguem :)" />
        <br>
      </div>
    </q-dialog>

    <!--  Cidades dialog  -->

    <q-dialog v-model="cidadesAtendimentoDialog">
      <div class="bg-white">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>Cidades de Atendimento</q-toolbar-title>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Fechar</q-tooltip>
          </q-btn>
        </q-toolbar>
      <q-list>
        <q-item v-for="cidade in cidadesAnuncio" :key="cidade.id">
          <q-item-section avatar>
            <q-icon v-if="cidade.cidadePrincipal == 1"
            name="location_city" color="blue" size="45px"/>
            <q-icon v-if="cidade.cidadePrincipal == 0"
            name="location_city" color="black" size="45px"/>
          </q-item-section>
          <q-item-section>
          {{cidade.nomeCidade}}, {{cidade.nomeMicroRegiao}} - {{cidade.uf}}
          </q-item-section>
        </q-item>
      </q-list>
        <br>
      </div>
    </q-dialog>
  </q-page>
</template>

<style>
  .q-carousel__slide img {
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
      idAnuncio: null,
      tituloAnuncio: null,
      ativo: null,
      nivelPrioridade: null,
      descricao: null,
      telefone: null,
      emailContato: null,
      criadoEm: null,
      idPessoa: null,
      nomePessoa: null,
      classificacao: null,
      imagensAnuncio: [],
      cidadesAnuncio: [],
      contadorImagensAnuncio: 0,
      contatoDialog: false,
      compartilharDialog: false,
      cidadesAtendimentoDialog: false,
    };
  },
  created() {
    this.token = localStorage.getItem('token');
    this.idAnuncio = this.$route.params.id;
    this.urlAnuncio = `http://www.encontraja.com.br/#${this.$route.fullPath}`;
    this.carregarImagensAnuncio();
    this.carregarAnuncio();
    this.carregarCidadesAnuncio();
  },
  methods: {
    carregarAnuncio() {
      axios.get(`http://localhost:8799/api/carregaAnuncio/${this.idAnuncio},${this.token}`)
        .then((response) => {
          this.tituloAnuncio = response.data.tituloAnuncio;
          this.ativo = response.data.ativo;
          this.nivelPrioridade = response.data.nivelPrioridade;
          this.descricao = response.data.descricao;
          this.telefone = response.data.telefone;
          this.emailContato = response.data.emailContato;
          this.criadoEm = response.data.criadoEm;
          this.idPessoa = response.data.idPessoa;
          this.nomePessoa = response.data.nomePessoa;
          this.classificacao = response.data.classificacao;
        }).catch((error) => {
          console.log(error);
        });
    },
    carregarImagensAnuncio() {
      axios.get(`http://localhost:8799/api/carregarImagemAnuncio/${this.idAnuncio}`)
        .then((response) => {
          response.data.forEach((imagem, index) => {
            console.log(imagem);
            this.imagensAnuncio.push({
              id: index,
              base64: imagem.base64,
              ativo: imagem.ativo,
              uploadEm: imagem.uploadEm,
            });
          });
        }).catch((error) => {
          console.log(error);
        });
    },
    carregarCidadesAnuncio() {
      axios.get(`http://localhost:8799/api/carregarLocalizacaoAnuncio/${this.idAnuncio}`)
        .then((response) => {
          this.cidadesAnuncio.push(response.data);
        }).catch((error) => {
          console.log(error);
        });
    },
    carregarPerfilAnuncio() {
      this.$router.push(`/perfil/${this.idPessoa}`);
    },
  },
};
</script>
