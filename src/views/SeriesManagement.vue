<template>
    <Menu />
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Gestão de Séries</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-button expand="block" @click="openAddModel">
          <ion-icon slot="start" name="add-outline"></ion-icon>
          Adicionar Série
        </ion-button>
        <SeriesList :series="series" @view-details="viewSeriesDetails" />
        <SeriesDetails v-if="selectedSeries" :series-detail="selectedSeries" />
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { fetchSeries } from '@/utils/api';
  import SeriesList from '@/components/SeriesList.vue';
  import SeriesDetails from '@/components/SeriesDetails.vue';
  import Menu from '@/components/Menu.vue';
  
  export default defineComponent({
    components: {
      SeriesList,
      SeriesDetails,
      Menu,
    },
    setup() {
      const series = ref(fetchSeries());
      const selectedSeries = ref(null);
  
      const viewSeriesDetails = (seriesItem) => {
        selectedSeries.value = seriesItem;
      };
  
      const openAddModel = () => {
        // Lógica para abrir o modal de adicionar série
      };
  
      return {
        series,
        selectedSeries,
        viewSeriesDetails,
        openAddModel,
      };
    },
  });
  </script>
  