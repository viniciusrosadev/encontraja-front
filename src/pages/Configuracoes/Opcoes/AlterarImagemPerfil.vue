<template>
  <q-page class="flex flex-center">
    <div class="ajeitarEspaco"
    v-if="cadastrado == true"
    >
    <q-avatar
    class="ajeitarEspacoImagem"
    rounded
    >
      <q-img v-bind:src="imagemAtual">
        <q-icon name="close" color="red" size="25px"
        @click="removerImagemAtualDePerfil"
        />
        <div class="absolute-bottom text-center q-pa-xs"
        @click="enviarImagemDialogo = true"
        >
          <q-icon name="edit" size="25px"/>
        </div>
      </q-img>
    </q-avatar>
    </div>

      <!-- Dialogo enviar imagem -->

      <q-dialog
      v-model="enviarImagemDialogo"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close"
          v-close-popup>
            <q-tooltip
            content-class="bg-white text-primary">Fechar</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h5">Alterar imagem de perfil</div>
        </q-card-section>

        <q-card-section>
        <q-uploader
          label="Selecione a imagem de perfil"
          @added="adicionarImagem"
          @removed="removerImagem"
          accept=".jpg, .png, .jpeg, .gif, image/*"
          style="width: 100%;"
          align="center"
        >
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
              <div class="col">
                <div class="q-uploader__title">Imagem de perfil</div>
                <div
                  class="q-uploader__subtitle"
                >{{ scope.uploadSizeLabel }}</div>
              </div>
               <q-btn
                v-if="scope.queuedFiles.length > 0"
                icon="clear_all"
                @click="scope.removeQueuedFiles"
                round
                dense
                flat
              >
                <q-tooltip>Limpar tudo</q-tooltip>
              </q-btn>
              <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                <q-uploader-add-trigger />
                <q-tooltip>Escolha a imagem</q-tooltip>
              </q-btn>
            </div>
          </template>
        </q-uploader>
        </q-card-section>
        <q-btn label="Alterar"
        v-if="imagemNova.length > 0"
        @click="enviarImagem"
        class="bg-white text-primary"
        />
      </q-card>
      </q-dialog>
     <span v-if="!cadastrado">Você precisa estar logado, para alterar uma
       imagem!
     </span>
  </q-page>
</template>

<style>
.ajeitarEspaco {
  width: 300px;
  height: 300px;
}

.ajeitarEspacoImagem {
  width: 100%;
  height: 100%;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      token: null,
      imagemNova: [],
      imagemAtual: null,
      enviarImagemDialogo: false,
      cadastrado: false,
    };
  },
  created() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.cadastrado = true;
      this.carregarImagemDePerfil();
    }
  },
  methods: {
    carregarImagemDePerfil() {
      axios.get(`http://localhost:8799/api/mostrarImagemAlteracaoDePerfil/${this.token}`)
        .then((response) => {
          this.imagemAtual = response.data;
        }).catch((error) => {
          console.log(error);
        });
    },
    enviarImagem() {
      axios.post('http://localhost:8799/api/guardarImagem', {
        token: this.token,
        imagem: this.imagemNova,
      }).then((response) => {
        if (response.data.erro) {
          console.log('erro');
        }
        this.enviarImagemDialogo = false;
        this.imagemAtual = this.imagemNova[0].base64;
      });
    },
    adicionarImagem(imagemDePerfil) {
      imagemDePerfil.forEach((imagem) => {
        this.imagemNova.push({
          // eslint-disable-next-line no-underscore-dangle
          base64: imagem.__img.src,
          tipo: 'perfil',
        });
      });
    },
    // eslint-disable-next-line no-unused-vars
    removerImagem(imagemRemovida) {
      this.imagemNova = [];
    },
    removerImagemAtualDePerfil() {
      axios.get(`http://localhost:8799/api/excluirImagemDePerfil/${this.token}`)
        .then((response) => {
          if (response.data.Status === 200) {
            this.$router.push('/');
          }
        }).catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
