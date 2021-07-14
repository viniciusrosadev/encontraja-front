<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
    <q-form
    @submit="pesquisar"
    v-if="!pesquisaAtiva"
    >
      <q-input
        filled
        v-model="termoPesquisado"
        label="Procurar"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Escreva algo para pesquisar.']"
      />

        <q-expansion-item
          v-model="descricaoExpandido"
          icon="class"
          label="+ Descrição"
          align="center"
        >
          <br>
        <q-input
          filled
          v-model="descricaoPesquisada"
          label="Procurar descrição"
        />
          <br>
        </q-expansion-item>

        <q-expansion-item
          v-model="dataExpandida"
          icon="date_range"
          label="+ Data"
          align="center"
        >
          <br>
      <q-input filled v-model="dataInicialPesquisada"
        label="Data de início"
        stack-label
        mask="##/##/####">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" tranwsition-show="scale" transition-hide="scale">
                <q-date mask = "DD/MM/YYYY" v-model="dataInicialPesquisada"
                @input="() => $refs.qDateProxy.hide()" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      <br>
      <q-input filled v-model="dataFinalPesquisada"
        label="Data de fim"
        stack-label
        mask="##/##/####">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date mask = "DD/MM/YYYY" v-model="dataFinalPesquisada"
                @input="() => $refs.qDateProxy.hide()" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
          <br>
        </q-expansion-item>

    <q-expansion-item
       v-model="cidadePesquisadaExpandida"
       icon="perm_identity"
       label="+ Cidade"
       align="center" >
        <br>
          <q-card>
                <q-item-section v-if="!cidadePesquisada">
                <q-btn label = "Adicionar cidade"
                @click="adicionarCidadeDialog = true" />
                </q-item-section>
            <q-item v-for="cidade in this.cidadesPesquisa" :key="cidade.id">
                <q-item-section avatar v-if="cidadesPesquisa.length !== 0">
                  <q-btn icon="close" @click="eliminarCidade" />
                </q-item-section>

                <q-item-section align="left">
                  <q-item-label>
                    Estado: {{cidade.nomeEstado}}
                  </q-item-label>
                  <q-item-label>
                    Região: {{cidade.nomeMicroRegiao}}
                  </q-item-label>
                  <q-item-label>
                    Cidade: {{cidade.nomeCidade}}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
      <br>
    </q-expansion-item>

        <!--    Dialogo cidade    -->

      <q-dialog
      v-model="adicionarCidadeDialog"
      persistent
      :maximized="dialogoTelaCheia"
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
          <div class="text-h4">Adicionar cidade</div>
        </q-card-section>

        <q-card-section>
       <q-select
        filled
        v-model="estadoEscolhido"
        :options="opcoesEstado"
        label="Selecione o estado"
        clearable
        class="bg-white"
        >
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <br>

          <q-select
            filled
            v-model="microRegiaoEscolhido"
            :options="opcoesMicroRegiao"
            v-if="estadoEscolhido.length !== 0"
            label="Selecione a região estadual"
            clearable
            class="bg-white"
            >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
            >
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <br>

          <q-select
            filled
            v-model="cidadeEscolhido"
            :options="opcoesCidade"
            v-if="microRegiaoEscolhido.length !== 0"
            label="Selecione a cidade"
            clearable
            class="bg-white"
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <br>

          <q-btn label = "Gravar cidade"
                 @click="adicionarCidadeDialog = false"
                 v-if="estadoEscolhido.length !== 0 && microRegiaoEscolhido.length !== 0
                 && cidadeEscolhido.length !== 0" class="bg-white text-primary"/>
        </q-card-section>
      </q-card>
    </q-dialog>
    <br>
    <div align="center">
      <q-btn round color="primary"
             icon="search" type="submit"/>
    </div>

    </q-form>
  <q-list style="max-width: 350px" v-if="pesquisaAtiva">
      <q-item-label header>Anúncios encontrados</q-item-label>

      <q-item clickable v-ripple v-for="anuncio in this.pesquisaRetorno" :key="anuncio.idAnuncio">
      <q-item>
        <q-item-section top thumbnail class="q-ml-none"
        @click="entrarAnuncio(anuncio.idAnuncio)">
          <img v-bind:src="anuncio.base64">
        </q-item-section>
        <q-item-section @click="entrarAnuncio(anuncio.idAnuncio)">
          <q-item-label>{{ anuncio.tituloAnuncio }}</q-item-label>
          <q-item-label caption>{{ anuncio.criadoEm }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="send" color="primary" />
        </q-item-section>
      </q-item>
      </q-item>
    </q-list>
    </div>
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
      cidadePesquisada: null,
      descricaoPesquisada: null,
      dataInicialPesquisada: null,
      dataFinalPesquisada: null,
      termoPesquisado: null,
      pesquisaRetorno: [],
      cidadesPesquisa: [],
      opcoesEstado: [],
      opcoesMicroRegiao: [],
      opcoesCidade: [],
      estadoEscolhido: [],
      microRegiaoEscolhido: [],
      cidadeEscolhido: [],
      descricaoExpandido: false,
      dataExpandida: false,
      cidadePesquisadaExpandida: false,
      adicionarCidadeDialog: false,
      dialogoTelaCheia: true,
      pesquisaAtiva: false,
    };
  },
  created() {
    this.token = localStorage.getItem('token');
  },
  watch: {
    adicionarCidadeDialog: function adicionarCidadeDialog(val) {
      switch (val) {
        case true:
          this.carregarEstados();
          break;
        case false:
          if (this.estadoEscolhido.length !== 0
          && this.microRegiaoEscolhido.length !== 0
          && this.cidadeEscolhido.length !== 0) {
            this.cidadesPesquisa.push({
              idEstado: this.estadoEscolhido.value,
              nomeEstado: this.estadoEscolhido.label,
              idMicroRegiao: this.microRegiaoEscolhido.value,
              nomeMicroRegiao: this.microRegiaoEscolhido.label,
              idCidade: this.cidadeEscolhido.value,
              nomeCidade: this.cidadeEscolhido.label,
            });
            this.cidadePesquisada = this.cidadesPesquisa[0].idCidade;
            this.opcoesEstado = [];
            this.estadoEscolhido = [];
            this.opcoesMicroRegiao = [];
            this.microRegiaoEscolhido = [];
            this.opcoesCidade = [];
            this.cidadeEscolhido = [];
          }
          break;
        default:
          break;
      }
    },
    estadoEscolhido: function estadoEscolhido(estado) {
      this.microRegiaoEscolhido = [];
      this.cidadeEscolhido = [];
      this.opcoesMicroRegiao = [];
      this.opcoesCidade = [];
      this.carregarMicroRegioes(estado.value);
    },
    microRegiaoEscolhido: function microRegiaoEscolhido(microRegiao) {
      this.cidadeEscolhido = [];
      this.opcoesCidade = [];
      this.carregarCidades(this.estadoEscolhido.value, microRegiao.value);
    },
  },
  methods: {
    eliminarCidade(index) {
      this.cidadesPesquisa.splice(index, 1);
      this.cidadePesquisada = null;
    },
    carregarEstados() {
      this.opcoesEstado = [];
      this.opcoesMicroRegiao = [];
      this.opcoesCidade = [];
      axios.get('http://localhost:8799/api/localizaEstados/')
        .then((response) => {
          const respostaEstado = response.data;

          respostaEstado.forEach((estado) => {
            this.opcoesEstado.push({
              value: estado.id,
              label: estado.UF,
            });
          });
        }).catch((error) => {
          console.log(error);
        });
    },
    carregarMicroRegioes(idEstado) {
      axios.get(`http://localhost:8799/api/localizaMicroRegioes/${idEstado}`)
        .then((response) => {
          const respostaMicroRegioes = response.data;

          respostaMicroRegioes.forEach((microregiao) => {
            this.opcoesMicroRegiao.push({
              value: microregiao.id,
              label: microregiao.nome,
            });
          });
        }).catch((error) => {
          console.log(error);
        });
    },
    carregarCidades(idEstado, idMicroRegiao) {
      axios.get(`http://localhost:8799/api/localizaCidades/${idEstado},${idMicroRegiao}`)
        .then((response) => {
          const respostaCidades = response.data;

          respostaCidades.forEach((cidade) => {
            this.opcoesCidade.push({
              value: cidade.id,
              label: cidade.nome,
            });
          });
        }).catch((error) => {
          console.log(error);
        });
    },
    pesquisar() {
      let envioPost = null;

      envioPost = {
        token: this.token,
        termoPesquisado: this.termoPesquisado,
      };
      if (this.descricaoPesquisada) {
        envioPost.descricaoPesquisada = this.descricaoPesquisada;
      }
      if (this.cidadePesquisada) {
        envioPost.cidadePesquisada = this.cidadePesquisada;
      }
      if (this.dataInicialPesquisada) {
        envioPost.dataInicialPesquisada = this.dataInicialPesquisada;
      }
      if (this.dataFinalPesquisada) {
        envioPost.dataFinalPesquisada = this.dataFinalPesquisada;
      }

      axios.post('http://localhost:8799/api/pesquisaAnuncio', envioPost).then((response) => {
        this.pesquisaAtiva = true;
        this.pesquisaRetorno = response.data;
      });
    },
    entrarAnuncio(idAnuncio) {
      this.$router.push(`/anuncio/${idAnuncio}`);
    },
  },
};
</script>
