<script setup lang="ts">
import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { logoIonic } from 'ionicons/icons'
import PieChart from '@/components/PieChart.vue'
import Notifications from '@/components/Notifications.vue'
</script>

<template>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="notifications">
        Últimas Notificações
      </div>
      <notifications />
      <div class="chart-position">
        <pie-chart />
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.chart-position {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 300px;
}

.notifications {
  font-weight: bold;
  position: absolute;
  top: 20px;
  right: 30px;
  width: 300px;
  height: 300px;
}
</style>
