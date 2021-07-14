<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
      <div class="col-4" v-for="anuncio in anunciosTopo" :key="anuncio.idAnuncio"
      @click="acessarAnuncio(anuncio.idAnuncio)">
        <div class="imagemAreaAnuncioTopo">
          <q-img v-bind:src="anuncio.base64" class="imagemAnuncioTopo no-padding"
          transition="fade"/>
        </div>
        <div class="textoAreaAnunicoTopo">
          <span>{{anuncio.tituloAnuncio}}
          </span>
        </div>
      </div>
    </div>
    <q-separator />
    <div>
      <h6>Recentes</h6>
    </div>
    <q-list>
      <q-item v-for="anuncioRecente in anunciosRecentes" :key="anuncioRecente.idAnuncio"
      @click.native="acessarAnuncio(anuncioRecente.idAnuncio)">
        <q-item-section avatar>
        <q-img v-bind:src="anuncioRecente.imagemPerfil64"
        transition="fade"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{anuncioRecente.tituloAnuncio}}</q-item-label>
          <q-item-label caption lines="2">{{anuncioRecente.criadoEm}}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-icon name="info" color="blue" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<style>
.imagemAnuncioTopo {
  width: 100%;
  height: 100%;
}
.imagemAreaAnuncioTopo {
  width: 110px;
  height: 75px;
}
.textoAreaAnunicoTopo span {
  word-wrap: break-word;
}
.textoAreaAnunicoTopo {
  width: 110px;
  height: 58px;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      token: null,
      anunciosTopo: [],
      anunciosRecentes: [],
      quantidadeAnuncios: 6,
      quantidadeAnunciosRecentes: 3,
    };
  },
  created() {
    this.token = localStorage.getItem('token');
    this.carregarAnunciosTopo();
    this.carregarAnunciosRecentes();
  },
  methods: {
    carregarAnunciosTopo() {
      axios.get(`http://localhost:8799/api/listaAnunciosTopo/${this.quantidadeAnuncios}`)
        .then((response) => {
          const respostaAnunciosTopo = response.data;
          if (respostaAnunciosTopo) {
            respostaAnunciosTopo.forEach((anuncioTopo) => {
              this.anunciosTopo.push({
                idAnuncio: anuncioTopo.idAnuncio,
                tituloAnuncio: anuncioTopo.tituloAnuncio,
                criadoEm: anuncioTopo.criadoEm,
                base64: anuncioTopo.base64,
              });
            });
          }
        });
    },
    acessarAnuncio(idAnuncio) {
      this.$router.push(`/anuncio/${idAnuncio}`);
    },
    carregarAnunciosRecentes() {
      axios.get(`http://localhost:8799/api/listaAnunciosRecentes/${this.quantidadeAnunciosRecentes}`)
        .then((response) => {
          const respostaAnunciosRecentes = response.data;
          if (!respostaAnunciosRecentes.erro) {
            respostaAnunciosRecentes.forEach((anuncioRecente) => {
              this.anunciosRecentes.push(anuncioRecente);
            });
          }
        });
    },
  },
};
</script>
