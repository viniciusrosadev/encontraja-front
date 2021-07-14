<template>
  <q-page class="flex flex-center">
  <div class="q-pa-md q-gutter-md">
    <q-list bordered padding class="rounded-borders" style="max-width: 350px"
            v-if="anuncios.length > 0">
      <q-item-label header>Meus anúncios</q-item-label>
      <q-item clickable v-ripple v-for="anuncio in anuncios" :key="anuncio.idAnuncio">
      <q-item>
        <q-item-section top thumbnail class="q-ml-none"
        @click="entrarAnuncio(anuncio.idAnuncio)">
          <img v-bind:src="anuncio.base64">
        </q-item-section>
        <q-item-section @click="entrarAnuncio(anuncio.idAnuncio)">
          <q-item-label>{{ anuncio.tituloAnuncio }}</q-item-label>
          <q-item-label caption>{{ anuncio.criadoEm }}</q-item-label>
        </q-item-section>
        <q-item-section side
        @click="excluirAnuncioDialogF(anuncio.idAnuncio)"
        >
          <q-icon name="close" color="negative" />
        </q-item-section>
      </q-item>
        </q-item>
    </q-list>

    <q-btn flat filled color="primary" label = "Criar anúncio" to = "/cadastraranuncio" />
  </div>

  <!-- Dialog excluir anuncio -->

  <q-dialog v-model="excluirAnuncioDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Você deseja excluir este anúncio?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="cancelarExcluirAnuncioDialog" />
          <q-btn flat label="Excluir" color="negative" @click="excluirAnuncio" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style>
</style>

<script>
import axios from 'axios';

export default {
  name: 'MeusAnuncios',
  data() {
    return {
      token: null,
      anuncios: [],
      excluirAnuncioDialog: false,
      excluirIdAnuncio: null,
    };
  },
  created() {
    this.meusAnuncios();
  },
  methods: {
    meusAnuncios() {
      this.token = localStorage.getItem('token');

      axios.get(`http://localhost:8799/api/carregaAnunciosUsuario/${this.token}`)
        .then((response) => {
          this.anuncios = response.data;
        }).catch((error) => {
          console.log(error);
        });
    },
    entrarAnuncio(idAnuncio) {
      this.$router.push(`/anuncio/${idAnuncio}`);
    },
    excluirAnuncioDialogF(idAnuncio) {
      this.excluirIdAnuncio = idAnuncio;
      this.excluirAnuncioDialog = true;
    },
    cancelarExcluirAnuncioDialog() {
      this.excluirIdAnuncio = null;
      this.excluirAnuncioDialog = false;
    },
    excluirAnuncio() {
      axios.get(`http://localhost:8799/api/excluirAnuncio/${this.token},${this.excluirIdAnuncio}`)
        .then((response) => {
          console.log(response.data);
          this.excluirAnuncioDialog = false;
          this.$router.push('/menuprincipal');
        }).catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
