<script lang="ts">
import { IonBadge, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/vue'
import { defineComponent } from 'vue'
import { logoIonic } from 'ionicons/icons'
import PieChart from '@/components/PieChart.vue' // Certifique-se de que o caminho está correto
import Notifications from '@/components/Notifications.vue'

export default defineComponent({
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
    PieChart,
    Notifications,
    IonToast,
    IonBadge,
    IonItem,
    IonLabel,
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
