<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { defineComponent } from 'vue'
import { logoIonic } from 'ionicons/icons'

export default defineComponent({
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
  },
  setup() {
    return { logoIonic }
  },
})
</script>

<template>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      Tap the button in the toolbar to open the menu.
      <h1 class="dash">
        Dashboard
      </h1>
    </ion-content>
  </ion-page>
</template>
