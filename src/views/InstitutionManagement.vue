<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/vue'

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
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
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
    const isAddModalOpen = ref(false)
    const editMode = ref(false)
    const institutionForm = ref<Institution>({ id: Date.now(), name: '', acronym: '', address: '', phone: '', email: '', description: '', series: '', turmas: '', teachers: '', schedule: '', discipline: '' })

    const openAddModel = () => {
      isAddModalOpen.value = true
      editMode.value = false
      institutionForm.value = { id: Date.now(), name: '', acronym: '', address: '', phone: '', email: '', description: '', series: '', turmas: '', teachers: '', schedule: '', discipline: '' }
    }

    const openEditModel = (item: Institution) => {
      isAddModalOpen.value = true
      editMode.value = true
      institutionForm.value = { ...item }
    }

    const saveInstitution = async () => {
      try {
        if (editMode.value) {
          const index = institutions.value.findIndex(i => i.id === institutionForm.value.id)
          if (index !== -1) {
            institutions.value[index] = { ...institutionForm.value }
          }
        }
        else {
          institutions.value.push({ ...institutionForm.value, id: Date.now() })
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
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestão de Instituições</ion-title>
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
              <ion-input v-model="institutionForm.name" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Sigla *
              </ion-label>
              <ion-input v-model="institutionForm.acronym" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Endereço *
              </ion-label>
              <ion-input v-model="institutionForm.address" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Telefone *
              </ion-label>
              <ion-input v-model="institutionForm.phone" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                E-mail *
              </ion-label>
              <ion-input v-model="institutionForm.email" type="email" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Descrição
              </ion-label>
              <ion-textarea v-model="institutionForm.description" />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Nome da Escola
              </ion-label>
              <ion-input v-model="institutionForm.schools" placeholder="Adicionar escolas separadas por vírgula" />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Séries
              </ion-label>
              <ion-input v-model="institutionForm.series" placeholder="Adicionar séries separadas por vírgula" />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Turmas
              </ion-label>
              <ion-input v-model="institutionForm.turmas" placeholder="Adicionar turmas separadas por vírgula" />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Professores
              </ion-label>
              <ion-input v-model="institutionForm.teachers" placeholder="Adicionar escolas separadas por vírgula" />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Horários
              </ion-label>
              <ion-input v-model="institutionForm.schedule" placeholder="Adicionar escolas separadas por vírgula" />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Disciplinas
              </ion-label>
              <ion-input v-model="institutionForm.discipline" placeholder="Adicionar escolas separadas por vírgula" />
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
