<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/vue'
import { fetchSeries } from '@/utils/api'
import SeriesList from '@/components/SeriesList.vue'
import SeriesDetails from '@/components/SeriesDetails.vue'

interface Series {
  id: number
  name: string
  description: string
}

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    SeriesList,
    SeriesDetails,
  },
  setup() {
    const series = ref(fetchSeries())
    const selectedSeries = ref(null)
    const isAddModalOpen = ref(false)
    const editMode = ref(false)
    const seriesForm = ref<Series>({ id: 0, name: '', description: '' })

    const viewSeriesDetails = (seriesItem) => {
      selectedSeries.value = seriesItem
    }

    const openAddModel = () => {
      isAddModalOpen.value = true
      editMode.value = false
      seriesForm.value = { id: 0, name: '', description: '' }
    }

    const openEditModel = (item: Series) => {
      isAddModalOpen.value = true
      editMode.value = true
      seriesForm.value = { ...item }
    }

    const addModalDismiss = () => {
      isAddModalOpen.value = false
    }

    const saveSeries = async () => {
      try {
        if (editMode.value) {
          const index = series.value.findIndex(i => i.id === seriesForm.value.id)
          series.value[index] = { ...seriesForm.value }
        }
        else {
          const newSeries: Series = { ...seriesForm.value, id: Date.now() }
          series.value.push(newSeries)
        }
        await new Promise(resolve => setTimeout(resolve, 500))
        addModalDismiss()
      }
      catch (error) {
        console.error('Error saving series:', error)
      }
    }

    const deleteSeries = async (item: Series) => {
      try {
        const index = series.value.findIndex(i => i.id === item.id)
        series.value.splice(index, 1)
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      catch (error) {
        console.error('Error deleting series:', error)
      }
    }

    return {
      series,
      selectedSeries,
      viewSeriesDetails,
      isAddModalOpen,
      editMode,
      seriesForm,
      openAddModel,
      openEditModel,
      addModalDismiss,
      saveSeries,
      deleteSeries,
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
      <ion-modal :is-open="isAddModalOpen" css-class="my-custom-modal">
        <ion-header />
        <ion-content class="modal-content">
          <div class="form-container">
            <ion-item class="form-item">
              <ion-label position="fixed">
                Nome *
              </ion-label>
              <ion-input v-model="seriesForm.name" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Descrição
              </ion-label>
              <ion-textarea v-model="seriesForm.description" />
            </ion-item>
            <ion-button expand="block" @click="saveSeries">
              {{ editMode ? 'Salvar Alterações' : 'Adicionar' }}
            </ion-button>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.form-container {
  padding: 2.0em;
  width: 100%;
  max-width: 5000px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-item {
  width: 100%;
  max-width: 400px;
  margin: 5px 0;
}

ion-item.form-item {
  --inner-padding-start: 8px;
  --inner-padding-end: 8px;
  --border-radius: 10px;
  --padding-bottom: 8px;
  --padding-top: 8px;
}

ion-button {
  margin-top: 15px;
  width: 100%;
  max-width: 400px;
  --border-radius: 10px;
}

.searchbar {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  --border-radius: 10px;
}
</style>
