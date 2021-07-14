<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-list bordered class="rounded-borders">
        <q-item clickable v-ripple to="/alterarEmail">
          <q-item-section>
            Alterar E-mail
          </q-item-section>
          <q-item-section avatar>
          <q-icon size = "20px" name="email" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/alterarSenha">
          <q-item-section>
            Alterar senha
          </q-item-section>
          <q-item-section avatar>
            <q-icon size = "20px" name="vpn_key" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/alterarImagemPerfil">
          <q-item-section>
            Alterar imagem de perfil
          </q-item-section>
          <q-item-section avatar>
            <q-icon size = "20px" name="touch_app" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/acessarSuporte">
          <q-item-section>
            Suporte
          </q-item-section>
          <q-item-section avatar>
            <q-icon size = "20px" name="speaker_notes" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {

  },
};
</script>
