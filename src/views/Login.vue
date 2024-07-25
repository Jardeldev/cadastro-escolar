<script lang="ts">
import { defineComponent } from 'vue'
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/vue'

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  },
  data() {
    return {
      username: '',
      password: '',
      showAlert: false,
      alertMessage: '',
      alertButtons: ['OK'],
    }
  },

  methods: {
    login() {
      // Lógica de autenticação
    },
  },
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form class="form" @submit.prevent="login">
        <ion-item class="form-username">
          <ion-label position="stacked">
            Usuário
          </ion-label>
          <ion-input v-model="username" type="text" />
        </ion-item>
        <ion-item class="form-password">
          <ion-label position="stacked">
            Senha
          </ion-label>
          <ion-input v-model="password" type="password" />
        </ion-item>
        <ion-button class="form-button" type="submit" expand="block" @click="login">
          Login
        </ion-button>
      </form>
      <ion-alert :is-open="showAlert" :message="alertMessage" :buttons="alertButtons" />
    </ion-content>
  </ion-page>
</template>

<style scoped>
    /* CSS para estilizar o formulário e botão */
   .form-username, .form-password {
     margin-bottom: 10px;
   }

   form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
    height: 100vh;
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
   }
</style>
