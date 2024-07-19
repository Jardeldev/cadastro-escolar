<script setup lang="ts">
import { IonAccordion, IonAccordionGroup, IonApp, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonMenu, IonMenuButton, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/vue'
import { useRouter } from 'vue-router'

const router = useRouter()
function goToRoute(route: string) {
  router.push(route)
  console.log(route)
}
</script>

<template>
  <ion-app>
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
            <div slot="content" class="ion-padding">
              <ion-button expand="block" href="/dashboard">
                Visão Geral
              </ion-button>
            </div>
          </ion-accordion>
          <ion-accordion class="accordion" value="second">
            <ion-item slot="header" color="light">
              <ion-label>Gestão de Instituições</ion-label>
            </ion-item>
            <div slot="content" class="ion-padding">
              <ion-button expand="block" @click="goToRoute('/instituicoes/lista')">
                Lista de Instituições
              </ion-button>
              <ion-button expand="block">
                Adicionar Instituição
              </ion-button>
            </div>
          </ion-accordion>
          <ion-accordion class="accordion" value="third">
            <ion-item slot="header" color="light">
              <ion-label>Gestão de Escolas</ion-label>
            </ion-item>
            <div slot="content" class="ion-padding">
              <ion-button expand="block">
                Lista de Escolas
              </ion-button>
              <ion-button expand="block">
                Adicionar Escola
              </ion-button>
            </div>
          </ion-accordion>
          <ion-accordion class="accordion" value="fourth">
            <ion-item slot="header" color="light">
              <ion-label>Gestão de Séries</ion-label>
            </ion-item>
            <div slot="content" class="ion-padding">
              <ion-button expand="block">
                Lista de Séries
              </ion-button>
              <ion-button expand="block">
                Adicionar Séries
              </ion-button>
            </div>
          </ion-accordion>
          <ion-accordion class="accordion" value="fifth">
            <ion-item slot="header" color="light">
              <ion-label>Gestão de Classes</ion-label>
            </ion-item>
            <div slot="content" class="ion-padding">
              <ion-button expand="block">
                Lista de Classes
              </ion-button>
              <ion-button expand="block">
                Adicionar Classe
              </ion-button>
            </div>
          </ion-accordion>
          <ion-accordion class="accordion" value="sixth">
            <ion-item slot="header" color="light">
              <ion-label>Gestão de Turmas</ion-label>
            </ion-item>
            <div slot="content" class="ion-padding">
              <ion-button expand="block">
                Lista de Turmas
              </ion-button>
              <ion-button expand="block">
                Adicionar Turma
              </ion-button>
            </div>
          </ion-accordion>
        </ion-accordion-group>
      </ion-content>
    </ion-menu>
    <ion-page id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button />
          </ion-buttons>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-router-outlet />
    </ion-page>
  </ion-app>
</template>

<style scoped>
.accordion {
  margin-bottom: 5px;
}
</style>
