<template>
  <q-page class="flex flex-center">
     <div class="q-pa-md" style="max-width: 400px">

    <q-form
      class="q-gutter-md"
      @submit="enviar"
    >
      <q-input
        filled
        v-model="nomePessoa"
        label="Nome *"
        hint="Nome e sobrenome"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Escreva seu nome.']"
      />

      <q-input
        filled
        v-model="email"
        label="E-mail *"
        hint="Digite seu e-mail"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Sem E-mail? Sem cookies.']"
      />

      <q-field filled label="Selecione a data do seu aniversário" stack-label>
        <template v-slot:control>
          <q-date class="q-mt-sm full-width" minimal v-model="dataNascimento" />
        </template>
      </q-field>

      <q-select filled v-model="sexo" :options="opcoesSexo" label="Selecionar o sexo"
       transition-show="flip-up"
       transition-hide="flip-down" />

        <q-input
        filled
        type="textarea"
        v-model="descricao"
        label="Descrição"
        hint="Fale sobre você e suas qualidades como profissional"
      />
      <q-separator />
      <q-toggle v-model="aceitatermos" label="Eu aceito os termos e licença de uso." />

      <q-banner class="bg-primary text-white">
        Para ler os termos de uso, privacidade e outros. Toque no botão "Ler".
        Você será redirecionado.
        <template v-slot:action>
          <q-btn flat color="white" @click="abrirTermos = true" label="Ler" />
        </template>
      </q-banner>

      <q-dialog v-model="abrirTermos" transition-show="flip-up" transition-hide="flip-down">
        <q-card>
          <q-card-section>
            <div class="text-h5">Termos</div>
          </q-card-section>

          <q-card-section>
            <strong>Uso</strong>
            <p>O EncontraJa foi construído com base de que trabalhadores autónomos (independentes)
              possam divulgar seus serviços prestados
              em relação regional estadual do atendimento.
            </p>

            <p>Qualquer pessoa pode acessar e encontrar os anúncios ativos
              e divulgados pelo sistema.</p>

            <p>Algumas regras de uso são aplicadas para o bem-estar da comunidade que
              realiza o acesso na plataforma.</p>
            <p>1.É proibido a criação de usuários falsos.Em caso de óbito de usuário cadastrado,
              familiares deverão enviar e-mail para
              suporte@mg.encontraja.com.br com documentos comprobatórios
              para que sua conta e anúncios sejam desativados.</p>
            <p>2.É proibido o anúncio de empresas de grande porte.</p>
            <p>3.É proibido a utilização de emails temporários na criação de contas.</p>
            <p>4.Qualquer desrespeito (racismo, xenofobia, homofobia e outros)
              realizado na plataforma será excluído sem aviso prévio.</p>
            <p>5.Não é permitido o anúncio de itens e produtos onde serão excluídos
              caso ocorra detecção de irregularidade.
              Somente será permitido anúncio de serviços.</p>
            <p>6.As imagens envidas a plataforma não devem
              possuir direitos autorais não autorizados.</p>

            <strong>Condições</strong>

            <p>As condições explicitas podem variar de cada caso abordado,
              podendo ser respondidas por contato ao email suporte@mg.encontraja.com.br.</p>

            <p>1.Exclusão de conta: O usuário deve entrar em contato via
              suporte@mg.encontraja.com.br solicitando que sua conta seja desativada.</p>

            <p>2.Exclusão de anúncio: O anuncio pode ser desativado pelo painel
              de anúncio no botão respectivo a um ícone de X.</p>

            <strong>Privacidade</strong>

            <p>Todas as informações geradas e acessadas na plataforma são registradas e
              asseguradas de acordo com a lei de proteção de dados (LGPDP - Lei nº 13.709/2018)
              e ficarão armazenadas por até 5 anos.*</p>

            <p>* Informações pessoais que serão solicitadas ao decorrer do uso da plataforma:
              nome, e-mail e data de nascimento. Sendo destas apenas ficando visível a qualquer
              pessoa: nome e e-mail (quando informado no contato de um anuncio).</p>

            <strong>Cookies</strong>

            <br>

            <p>A plataforma utiliza um sistema de analise dos acessos referente ao Google Analytics,
              onde possui cookies de armazenamento sendo suas funções como distinguir usuários
              e outros descritos no link
              <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=pt-br">oficial</a>.
              Caso o usuário não deseja esse tipo de rastreamento,
              deverá não realizar o uso da plataforma.</p>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn flat label="Fechar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div>
        <q-btn label="Cadastrar" type="submit" color="primary"/>
      </div>
    </q-form>
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
      sexo: '',
      aceitatermos: false,
      nomePessoa: null,
      dataNascimento: null,
      email: null,
      descricao: null,
      opcoesSexo: ['Masculino', 'Feminino'],
      abrirTermos: false,
    };
  },
  methods: {
    enviar() {
      let auxSexo = 0;

      if (this.sexo === 'Masculino') {
        auxSexo = 0;
      } else {
        auxSexo = 1;
      }

      axios.post('http://localhost:8799/api/enviarUsuario', {
        nomePessoa: this.nomePessoa,
        email: this.email,
        dataNascimento: this.dataNascimento,
        sexo: auxSexo,
        descricao: this.descricao,
        aceitatermos: this.aceitatermos,
      }).then((response) => {
        const resposta = response.data;

        if (resposta.status === 200) {
          this.mostrarNotificacaoSucesso();
          this.$router.push('/');
        } else if (resposta.erro) {
          this.mostrarNotificacaoErro(resposta.erro);
        }
        // eslint-disable-next-line no-unused-vars
      }).catch((error) => {
        this.mostrarNotificacaoErro(null);
      });
    },
    mostrarNotificacaoSucesso() {
      this.$q.notify({
        color: 'green',
        message: 'Usuário criado com sucesso! Entre em sua conta com a senha enviado ao seu e-mail cadastrado.',
      });
    },
    mostrarNotificacaoErro(texto) {
      let textoNotificacao = texto;
      if (!textoNotificacao) {
        textoNotificacao = 'Erro durante a operação de cadastro do usuário, verifique os campos preenchidos!';
      }
      this.$q.notify({
        color: 'red',
        message: textoNotificacao,
      });
    },
  },
};
</script>
