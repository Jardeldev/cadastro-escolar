<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title>Sistema Escolar</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-accordion-group>
    <ion-accordion class="accordion" value="first">
      <ion-item slot="header" color="light">
        <ion-label>Dashboard</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">
        <ion-button expand="block" >Visão Geral</ion-button>
      </div>
    </ion-accordion>
    <ion-accordion class="accordion" value="second">
      <ion-item slot="header" color="light">
        <ion-label>Gestão de Instituições</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">
        <ion-button expand="block">Lista de Instituições</ion-button>
        <ion-button expand="block">Adicionar Instituição</ion-button>
      </div>
    </ion-accordion>
    <ion-accordion class="accordion" value="third">
      <ion-item slot="header" color="light">
        <ion-label>Gestão de Escolas</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">
        <ion-button expand="block">Lista de Escolas</ion-button>
        <ion-button expand="block">Adicionar Escola</ion-button>
      </div>
    </ion-accordion>
    <ion-accordion class="accordion" value="fourth">
      <ion-item slot="header" color="light">
        <ion-label>Gestão de Séries</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">
        <ion-button expand="block">Lista de Séries</ion-button>
        <ion-button expand="block">Adicionar Séries</ion-button>
      </div>
    </ion-accordion>
    <ion-accordion class="accordion" value="fifth">
      <ion-item slot="header" color="light">
        <ion-label>Gestão de Classes</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">
        <ion-button expand="block">Lista de Classes</ion-button>
        <ion-button expand="block">Adicionar Classe</ion-button>
      </div>
    </ion-accordion>
    <ion-accordion class="accordion" value="sixth">
      <ion-item slot="header" color="light">
        <ion-label>Gestão de Turmas</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">
        <ion-button expand="block">Lista de Turmas</ion-button>
        <ion-button expand="block">Adicionar Turma</ion-button>
      </div>
    </ion-accordion>
     </ion-accordion-group>
    </ion-content>
  </ion-menu>
  <ion-page id=main-content>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot=start>
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding"> Tap the button in the toolbar to open the menu. 
      <h1 class="dash">Dashboard</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { logoIonic } from 'ionicons/icons';
  import { IonIcon } from '@ionic/vue';

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
      return { logoIonic };
    },
  });
</script>