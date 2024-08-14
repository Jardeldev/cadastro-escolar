<script setup lang="ts">
import { ref } from 'vue'
import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/vue'

const username = ref('')
const password = ref('')
const showAlert = ref(false)
const alertMessage = ref('')
const alertButtons = ref(['OK'])

function login() {
  console.log(showAlert.value)
}
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
        <ion-button class="form-button" type="submit" expand="block">
          Login
        </ion-button>
      </form>
      <ion-alert :is-open="showAlert" :message="alertMessage" :buttons="alertButtons" />
    </ion-content>
  </ion-page>
</template>

<style scoped>
/* Estilos para o formulário de login */
.ion-page {
  --background: #f5f7fa;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-width: 350px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-username, .form-password {
  margin-bottom: 15px;
  width: 100%;
}

.ion-label {
  color: #4a5568;
}

.ion-input {
  --padding-start: 15px;
  --padding-end: 15px;
  --background: #edf2f7;
  --border-radius: 5px;
}

.form-button {
  --background: #4c8bf5;
  --border-radius: 5px;
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --padding: 10px;
  font-size: 16px;
}
</style>
