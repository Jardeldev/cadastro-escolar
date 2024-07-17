<template>
 <ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title>Login</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <form class="form" @submit.prevent="onLoginSubmit">
            <ion-item class="form-username">
                <ion-label position="stacked">Username</ion-label>
                <ion-input type="text" v-model="username"></ion-input>
            </ion-item>
            <ion-item class="form-password">
                <ion-label position="stacked">Password</ion-label>
                <ion-input type="password" v-model="password"></ion-input>
            </ion-item>
            <ion-button class="form-button" @click="login" type="submit" expand="block">Login</ion-button>
        </form>
        <ion-alert :is-open="showAlert" :message="alertMessage" :buttons="alertButtons"></ion-alert>
    </ion-content>
 </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';

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
            alertButtons: ['OK']
        };
    },

    methods: {
    login() {
      // Lógica de autenticação
    },
  },
});
</script>

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