<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/vue'
import TurmaList from '@/components/TurmaList.vue'

export interface Institution {
  id: number
  name: string
  acronym: string
  address: string
  phone: string
  email: string
  description: string
  schools: string
  series: string
  turmas: string
  teachers: string
  schedule: string
  discipline: string
}

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonToolbar,
    TurmaList,
  },
  setup() {
    const loadFromLocalStorage = (): Institution[] => {
      const data = localStorage.getItem('institutions')
      return data ? JSON.parse(data) : []
    }

    const saveToLocalStorage = (data: Institution[]) => {
      localStorage.setItem('institutions', JSON.stringify(data))
    }

    const institutions = ref<Institution[]>(loadFromLocalStorage())
    const selectedInstitution = ref<Institution | null>(null)
    const isAddModalOpen = ref(false)
    const editMode = ref(false)
    const institutionForm = ref<{ name: string, series: string, turmas: string, teachers: string, schedule: string, discipline: string }>({ name: '', series: '', turmas: '', teachers: '', schedule: '', discipline: '' })

    const openAddModel = () => {
      isAddModalOpen.value = true
      editMode.value = false
      institutionForm.value = { name: '', series: '', turmas: '', teachers: '', schedule: '', discipline: '' }
      selectedInstitution.value = null
    }

    const openEditModel = (item: Institution) => {
      selectedInstitution.value = item
      institutionForm.value = { name: item.schools, series: item.series, turmas: item.turmas, teachers: item.teachers, schedule: item.schedule, discipline: item.discipline }
      isAddModalOpen.value = true
      editMode.value = true
    }

    const saveInstitution = async () => {
      if (!selectedInstitution.value)
        return

      try {
        if (editMode.value) {
          const index = institutions.value.findIndex(i => i.id === selectedInstitution.value?.id)
          if (index !== -1) {
            institutions.value[index] = { ...institutions.value[index], schools: institutionForm.value.name, series: institutionForm.value.series, turmas: institutionForm.value.turmas }
          }
        }
        else {
          institutions.value.push({ ...institutionForm.value, id: Date.now(), name: '', acronym: '', address: '', phone: '', email: '', description: '', schools: '', series: '', turmas: '', teachers: '', schedule: '', discipline: '' })
        }
        saveToLocalStorage(institutions.value)
        isAddModalOpen.value = false
      }
      catch (error) {
        console.error('Error saving institution:', error)
      }
    }

    const deleteInstitution = async (item: Institution) => {
      try {
        const index = institutions.value.findIndex(i => i.id === item.id)
        if (index !== -1) {
          institutions.value.splice(index, 1)
          saveToLocalStorage(institutions.value)
        }
      }
      catch (error) {
        console.error('Error deleting institution:', error)
      }
    }

    onMounted(() => {
      institutions.value = loadFromLocalStorage()
    })

    watch(
      () => localStorage.getItem('institutions'),
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          institutions.value = loadFromLocalStorage()
        }
      },
      { deep: true },
    )

    return {
      institutions,
      selectedInstitution,
      isAddModalOpen,
      editMode,
      institutionForm,
      openAddModel,
      openEditModel,
      saveInstitution,
      deleteInstitution,
    }
  },
})
</script>

<template>
  <ion-page>
    <ion-header />
    <ion-toolbar />
    <ion-content>
      <turma-list
        :institutions="institutions"
        @edit-institution="openEditModel"
        @delete-institution="deleteInstitution"
      />

      <ion-modal :is-open="isAddModalOpen" css-class="my-custom-modal">
        <ion-content class="modal-content">
          <div class="form-container">
            <ion-item class="form-item">
              <ion-label position="fixed">
                Professores
              </ion-label>
              <ion-input v-model="institutionForm.teachers" placeholder="Adicionar professores separadas por vírgula" />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Horários
              </ion-label>
              <ion-input v-model="institutionForm.schedule" placeholder="Adicionar horários separadas por vírgula" />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Disciplinas
              </ion-label>
              <ion-input v-model="institutionForm.discipline" placeholder="Adicionar disciplinas separadas por vírgula" />
            </ion-item>
            <ion-button expand="block" @click="saveInstitution">
              {{ editMode ? 'Salvar Alterações' : 'Adicionar' }}
            </ion-button>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.accordion-item {
  width: 100%;
  max-width: 500px;
  margin: 10px auto; /* Adicionando margem para centralizar */
}

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
  margin: 5px 0; /* Diminuindo o espaçamento vertical */
}

ion-item.form-item {
  --inner-padding-start: 8px; /* Ajustando o padding interno */
  --inner-padding-end: 8px;
  --border-radius: 10px; /* Borda arredondada */
  --padding-bottom: 8px;
  --padding-top: 8px;
}

ion-button {
  margin-top: 15px; /* Diminuindo o espaçamento vertical */
  width: 100%;
  max-width: 400px;
  --border-radius: 10px; /* Borda arredondada */
}

.searchbar {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  --border-radius: 10px; /* Borda arredondada */
}
</style>
