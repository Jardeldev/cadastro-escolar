<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/vue'
import InstitutionList from '@/components/InstitutionList.vue'
// Interface que define a estrutura de uma instituição
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
}

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    InstitutionList,
  },
  setup() {
    // Função para carregar dados do localStorage
    const loadFromLocalStorage = (): Institution[] => {
      const data = localStorage.getItem('institutions')
      return data ? JSON.parse(data) : []
    }
    // Função para salvar dados no localStorage
    const saveToLocalStorage = (data: Institution[]) => {
      localStorage.setItem('institutions', JSON.stringify(data))
    }

    const institutions = ref<Institution[]>(loadFromLocalStorage())
    const selectedInstitution = ref<Institution | null>(null)
    const isAddModalOpen = ref(false)
    const editMode = ref(false)
    const institutionForm = ref<{ name: string, series: string, turmas: string }>({ name: '', series: '', turmas: '' })
    // Função para abrir o modal de adição
    const openAddModel = () => {
      isAddModalOpen.value = true
      editMode.value = false
      institutionForm.value = { name: '', series: '', turmas: '' }
      selectedInstitution.value = null
    }
    // Função para abrir o modal de edição
    const openEditModel = (item: Institution) => {
      selectedInstitution.value = item
      institutionForm.value = { name: item.schools, series: item.series, turmas: item.turmas }
      isAddModalOpen.value = true
      editMode.value = true
    }
    // Função para salvar uma instituição (adicionar ou editar)
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
          institutions.value.push({ ...institutionForm.value, id: Date.now(), name: '', acronym: '', address: '', phone: '', email: '', description: '', schools: '', series: '', turmas: '' })
        }
        saveToLocalStorage(institutions.value)
        isAddModalOpen.value = false
      }
      catch (error) {
        console.error('Error saving institution:', error)
      }
    }
    // Função para excluir uma instituição
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
    // Carrega os dados do localStorage quando o componente é montado
    onMounted(() => {
      institutions.value = loadFromLocalStorage()
    })
    // Assiste mudanças no localStorage e atualiza as instituições se necessário
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
    <ion-header>
      <ion-toolbar />
    </ion-header>
    <ion-content>
      <institution-list
        :institutions="institutions"
        @edit-institution="openEditModel"
        @delete-institution="deleteInstitution"
      />

      <ion-modal :is-open="isAddModalOpen" css-class="my-custom-modal">
        <ion-content class="modal-content">
          <div class="form-container">
            <ion-item v-if="editMode && selectedInstitution" class="form-item">
              <ion-label position="fixed">
                Nome da Escola
              </ion-label>
              <ion-input v-model="institutionForm.name" required />
            </ion-item>
            <ion-item v-if="editMode && selectedInstitution" class="form-item">
              <ion-label position="fixed">
                Séries
              </ion-label>
              <ion-input v-model="institutionForm.series" required />
            </ion-item>
            <ion-item v-if="editMode && selectedInstitution" class="form-item">
              <ion-label position="fixed">
                Turmas
              </ion-label>
              <ion-input v-model="institutionForm.turmas" required />
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
