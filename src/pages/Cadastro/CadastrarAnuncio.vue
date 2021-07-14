<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <q-form class="q-gutter-md"
      @submit="enviarAnuncio"
      v-if="cadastrado"
      >

      <q-input
        filled
        v-model="tituloAnuncio"
        label="Título do anúncio *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Digite um título']"
      />

        <q-expansion-item
          v-model="fotosAnuncioExpandido"
          icon="perm_identity"
          label="Fotos do anúncio"
          align="center"
        >
        <q-uploader
          label="Selecionar imagens do anúncio"
          multiple
          @added="adicionarImagens"
          @removed="removerImagem"
          accept=".jpg, .png, .jpeg, .gif, image/*"
          style="max-width: 300px"
        >
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
              <div class="col">
                <div class="q-uploader__title">Fotos do anúncio</div>
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
                <q-tooltip>Escolha os arquivos</q-tooltip>
              </q-btn>

            </div>
          </template>
        </q-uploader>
        </q-expansion-item>

        <q-expansion-item
          v-model="configuracoesAnuncioExpandido"
          icon="perm_identity"
          label="Configurações do anúncio"
          align="center"
        >
        <br>
        <q-input filled v-model="exibirData"
        label="Data inicial de exibição *"
        hint="Quando o anúncio vai começar a ser exibido."
        stack-label
        mask="##/##/####">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date mask = "DD/MM/YYYY" v-model="exibirData"
                @input="() => $refs.qDateProxy.hide()" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <br>
        <q-input
          filled
          type="textarea"
          v-model="descricao"
          label="Descrição do anúncio"
        />
        </q-expansion-item>

        <q-expansion-item
          v-model="contatoExpandido"
          icon="perm_identity"
          label="Contato do anúncio"
          align="center"
        >
          <br>
            <q-card>
              <q-item>
                <q-item-section v-if="!telefone && !emailContato">
                <q-btn label = "Adicionar contato"
                @click="adicionaContatoDialog = true"  />
                </q-item-section>

              <q-item-section avatar
              v-if="telefone || emailContato"
              >
                <q-btn icon="close"
                 @click="eliminarContato"
                />
              </q-item-section>

                <q-item-section v-if="telefone && !emailContato">
                  Telefone/Celular:
                </q-item-section>
                <q-item-section v-if="telefone && !emailContato">
                  {{ this.telefone }}
                </q-item-section>
                <q-item-section v-if="!telefone && emailContato">
                  Email:
                </q-item-section>
                <q-item-section v-if="!telefone && emailContato">
                  {{ this.emailContato }}
                </q-item-section>
              </q-item>
            </q-card>
          <br>
        </q-expansion-item>

        <!--    Dialogo contato    -->

      <q-dialog
      v-model="adicionaContatoDialog"
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
          <div class="text-h4">Adicionar contato</div>
        </q-card-section>

        <q-card-section>
       <q-select
        filled
        v-model="contatoEscolhido"
        :options="opcoesContato"
        label="Selecione o método de contato"
        color="teal"
        clearable
        class="bg-white"
        >
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <br>
          <q-input
            filled
            v-model="emailContato"
            v-if="contatoEscolhido.value === 'email'"
            label="E-mail *"
            hint="Digite seu e-mail"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Sem E-mail? Sem cookies.']"
            class="bg-white"
          />

          <q-input
            filled
            v-if="contatoEscolhido.value === 'telefone'"
            v-model="telefone"
            label="Digite seu telefone"
            mask="(##) ####-####"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Digite seu telefone']"
            class="bg-white"
          />

          <q-input
            filled
            v-if="contatoEscolhido.value === 'celular'"
            v-model="telefone"
            label="Digite seu celular"
            mask="(##) #####-####"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Digite seu celular']"
            class="bg-white"
          />
          <br>
          <q-btn label = "Gravar contato"
          @click="adicionaContatoDialog = false"
          v-if="telefone || emailContato"
          class="bg-white text-primary"
          />

        </q-card-section>
      </q-card>
    </q-dialog>

    <q-expansion-item
       v-model="abrangenciaTerritorialExpandido"
       icon="perm_identity"
       label="Abrangência territorial"
       align="center" >
        <br>
          <q-card>
                <q-item-section v-if="cidadesAnuncio.length === 0">
                <q-btn label = "Adicionar cidades"
                @click="adicionarCidadeDialog = true"  />
                </q-item-section>
            <q-item v-for="cidade in this.cidadesAnuncio" :key="cidade.id">
                <q-item-section avatar v-if="cidadesAnuncio.length !== 0">
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
                  <q-item-label>
                    Importância: {{cidade.cidadePrincipal === 1 ? 'Principal' : 'Secundária'}}
                  </q-item-label>
                </q-item-section>
              </q-item>
            <q-btn label="Adicionar cidade"
            v-if="cidadesAnuncio.length !== 0"
                   @click="adicionarCidadeDialog = true" />
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
          <div class="text-h4">Abrangência territorial</div>
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
          <q-list v-if="cidadeEscolhido.length !== 0">
            <q-item multiline tag="label" v-ripple>
              <q-item-section>
                <q-item-label>Cidade principal de atendimento</q-item-label>
                <q-item-label caption
                class="text-black">
                  {{ cidadePrincipal === false ? 'Não' : 'Sim' }}
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle color="blue" v-model="cidadePrincipal" />
              </q-item-section>
            </q-item>
          </q-list>

          <br>

          <q-btn label = "Gravar cidade"
                 @click="adicionarCidadeDialog = false"
                 v-if="estadoEscolhido.length !== 0 && microRegiaoEscolhido.length !== 0
                 && cidadeEscolhido.length !== 0"
                 class="bg-white text-primary"/>

        </q-card-section>
      </q-card>
    </q-dialog>

        <div>
         <q-btn label="Salvar" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
    <span v-if="!cadastrado">Você precisa estar logado, para criar um
       anúncio!
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
      tituloAnuncio: null,
      exibirData: null,
      nivelPrioridade: null,
      descricao: null,
      telefone: null,
      emailContato: null,
      cidadesAnuncio: [],
      imagens: [],
      adicionaContatoDialog: false,
      adicionarCidadeDialog: false,
      dialogoTelaCheia: true,
      contatoEscolhido: [],
      estadoEscolhido: [],
      microRegiaoEscolhido: [],
      cidadeEscolhido: [],
      cidadePrincipal: false,
      opcoesContato: [
        {
          label: 'Email',
          value: 'email',
          icon: 'mail',
        },
        {
          label: 'Telefone',
          value: 'telefone',
          icon: 'phone',
        },
        {
          label: 'Celular',
          value: 'celular',
          icon: 'phonelink_ring',
        },
      ],
      opcoesEstado: [],
      opcoesMicroRegiao: [],
      opcoesCidade: [],
      contatoExpandido: false,
      fotosAnuncioExpandido: false,
      configuracoesAnuncioExpandido: false,
      abrangenciaTerritorialExpandido: false,
      cadastrado: false,
    };
  },
  created() {
    this.token = localStorage.getItem('token');

    if (this.token) {
      this.cadastrado = true;
    }
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
            if (this.cidadePrincipal === true) {
              this.cidadePrincipal = 1;
            } else {
              this.cidadePrincipal = 0;
            }
            this.cidadesAnuncio.push({
              idEstado: this.estadoEscolhido.value,
              nomeEstado: this.estadoEscolhido.label,
              idMicroRegiao: this.microRegiaoEscolhido.value,
              nomeMicroRegiao: this.microRegiaoEscolhido.label,
              idCidade: this.cidadeEscolhido.value,
              nomeCidade: this.cidadeEscolhido.label,
              cidadePrincipal: this.cidadePrincipal,
            });
            this.opcoesEstado = [];
            this.estadoEscolhido = [];
            this.opcoesMicroRegiao = [];
            this.microRegiaoEscolhido = [];
            this.opcoesCidade = [];
            this.cidadeEscolhido = [];
            this.cidadePrincipal = false;
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
    eliminarContato() {
      this.telefone = null;
      this.emailContato = null;
    },
    eliminarCidade(index) {
      this.cidadesAnuncio.splice(index, 1);
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
    enviarAnuncio() {
      let envioPost = null;
      envioPost = {
        token: this.token,
        tituloAnuncio: this.tituloAnuncio,
        exibirData: this.exibirData,
        nivelPrioridade: this.nivelPrioridade,
        descricao: this.descricao,
        cidadesAnuncio: this.cidadesAnuncio,
      };

      if (this.telefone) {
        envioPost.telefone = this.telefone;
      }

      if (this.emailContato) {
        envioPost.emailContato = this.emailContato;
      }

      axios.post('http://localhost:8799/api/enviarAnuncio', envioPost).then((response) => {
        this.enviarImagem(response.data.idAnuncio);
        // eslint-disable-next-line no-unused-vars
      }).catch((response) => {
        this.mostrarNotificacaoErro();
      });
    },
    enviarImagem(idAnuncioEnviado) {
      const idAnuncioEnviar = idAnuncioEnviado;
      axios.post('http://localhost:8799/api/guardarImagem', {
        token: this.token,
        imagem: this.imagens,
        idAnuncio: idAnuncioEnviar,
        // eslint-disable-next-line no-unused-vars
      }).then((response) => {
        this.mostrarNotificacaoSucesso();
        this.$router.push('/');
      });
    },
    adicionarImagens(arquivosImagens) {
      arquivosImagens.forEach((imagem) => {
        this.imagens.push({
          // eslint-disable-next-line no-underscore-dangle
          base64: imagem.__img.src,
          nomeArquivo: imagem.name,
          tipo: 'anuncio',
        });
      });
    },
    removerImagem(imagem) {
      const indiceRemovedor = this.imagens.indexOf(imagem.name);
      this.imagens.splice(indiceRemovedor, 1);
    },
    mostrarNotificacaoSucesso() {
      this.$q.notify({
        color: 'green',
        message: 'O anúncio foi criado com sucesso!',
      });
    },
    mostrarNotificacaoErro() {
      this.$q.notify({
        color: 'red',
        message: 'Erro durante a criação do anúncio.',
      });
    },
  },
};
</script>
