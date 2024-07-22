<script lang="ts">
import { defineComponent, ref } from 'vue'
import { fetchSeries } from '@/utils/api'
import SeriesList from '@/components/SeriesList.vue'
import SeriesDetails from '@/components/SeriesDetails.vue'

export default defineComponent({
  components: {
    SeriesList,
    SeriesDetails,
  },
  setup() {
    const series = ref(fetchSeries())
    const selectedSeries = ref(null)

    const viewSeriesDetails = (seriesItem) => {
      selectedSeries.value = seriesItem
    }

    const openAddModel = () => {
      // Lógica para abrir o modal de adicionar série
    }

    return {
      series,
      selectedSeries,
      viewSeriesDetails,
      openAddModel,
    }
  },
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestão de Séries</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="form-container">
        <series-list :series="series" @view-details="viewSeriesDetails" />
        <series-details v-if="selectedSeries" :series-detail="selectedSeries" />
        <ion-button expand="block" @click="openAddModel">
          <ion-icon slot="start" name="add-outline" />
          Adicionar Série
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.form-container {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin-top: 50px;
    margin-bottom: 50px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
</style>
