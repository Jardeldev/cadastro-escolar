<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/vue'
import { fetchTurmas } from '@/utils/api'
import TurmaList from '@/components/TurmaList.vue'
import TurmaDetails from '@/components/TurmaDetails.vue'

interface Turma {
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
    TurmaList,
    TurmaDetails,
  },
  setup() {
    const turmas = ref(fetchTurmas())
    const selectedTurma = ref(null)
    const isAddModalOpen = ref(false)
    const editMode = ref(false)
    const turmaForm = ref<Turma>({ id: 0, name: '', description: '' })

    const viewTurmaDetails = (turma) => {
      selectedTurma.value = turma
    }

    const openAddModel = () => {
      isAddModalOpen.value = true
      editMode.value = false
      turmaForm.value = { id: 0, name: '', description: '' }
    }

    const openEditModel = (item: Turma) => {
      isAddModalOpen.value = true
      editMode.value = true
      turmaForm.value = { ...item }
    }

    const addModalDismiss = () => {
      isAddModalOpen.value = false
    }

    const saveTurma = async () => {
      try {
        if (editMode.value) {
          const index = turmas.value.findIndex(i => i.id === turmaForm.value.id)
          turmas.value[index] = { ...turmaForm.value }
        }
        else {
          const newTurma: Turma = { ...turmaForm.value, id: Date.now() }
          turmas.value.push(newTurma)
        }
        await new Promise(resolve => setTimeout(resolve, 500))
        addModalDismiss()
      }
      catch (error) {
        console.error('Error saving turma:', error)
      }
    }

    const deleteTurma = async (item: Turma) => {
      try {
        const index = turmas.value.findIndex(i => i.id === item.id)
        turmas.value.splice(index, 1)
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      catch (error) {
        console.error('Error deleting turma:', error)
      }
    }

    return {
      turmas,
      selectedTurma,
      viewTurmaDetails,
      isAddModalOpen,
      editMode,
      turmaForm,
      openAddModel,
      openEditModel,
      addModalDismiss,
      saveTurma,
      deleteTurma,
    }
  },
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestão de Turmas</ion-title>
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
              <ion-input v-model="turmaForm.name" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Descrição
              </ion-label>
              <ion-textarea v-model="turmaForm.description" />
            </ion-item>
            <ion-button expand="block" @click="saveTurma">
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
