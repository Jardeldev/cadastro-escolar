<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/vue'
import SchoolList from '@/components/SchoolList.vue'

// Interface que define a estrutura de uma instituição
interface Institution {
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

// Funções para manipular o localStorage
function loadFromLocalStorage(): Institution[] {
  const data = localStorage.getItem('institutions')
  return data ? JSON.parse(data) : []
}

function saveToLocalStorage(data: Institution[]) {
  localStorage.setItem('institutions', JSON.stringify(data))
}

const institutions = ref<Institution[] | any>(loadFromLocalStorage())
const selectedInstitution = ref<Institution | null>(null)
const isAddModalOpen = ref(false)
const editMode = ref(false)
const institutionForm = ref<{ name: string, series: string, turmas: string }>({ name: '', series: '', turmas: '' })

// Função para abrir o modal de adição
function _openAddModel() {
  isAddModalOpen.value = true
  editMode.value = false
  institutionForm.value = { name: '', series: '', turmas: '' }
  selectedInstitution.value = null
}

// Função para abrir o modal de edição
function openEditModel(item: Institution) {
  selectedInstitution.value = item
  institutionForm.value = { name: item.schools, series: item.series, turmas: item.turmas }
  isAddModalOpen.value = true
  editMode.value = true
}

// Função para salvar uma instituição (adicionar ou editar)
async function saveInstitution() {
  if (!selectedInstitution.value)
    return

  try {
    if (editMode.value) {
      const index = institutions.value.findIndex((i: Institution) => i.id === selectedInstitution.value?.id)
      if (index !== -1) {
        institutions.value[index] = { ...institutions.value[index], schools: institutionForm.value.name, series: institutionForm.value.series, turmas: institutionForm.value.turmas }
      }
    }
    else {
      institutions.value.push({ id: Date.now(), name: '', acronym: '', address: '', phone: '', email: '', description: '', schools: institutionForm.value.name, series: institutionForm.value.series, turmas: institutionForm.value.turmas,
      })
    }
    saveToLocalStorage(institutions.value)
    isAddModalOpen.value = false
  }
  catch (error) {
    console.error('Error saving institution:', error)
  }
}

// Função para excluir uma instituição
async function deleteInstitution(item: Institution) {
  try {
    const index = institutions.value.findIndex((i: Institution) => i.id === item.id)
    if (index !== -1) {
      institutions.value.splice(index, 1)
      saveToLocalStorage(institutions.value)
    }
  }
  catch (error) {
    console.error('Error deleting institution:', error)
  }
}

// Carregar dados do localStorage quando o componente for montado
onMounted(() => {
  institutions.value = loadFromLocalStorage()
})

// Reatividade para atualizar a lista quando o localStorage mudar
watch(
  () => localStorage.getItem('institutions'),
  (newVal: string | null, oldVal: string | null) => {
    if (newVal !== oldVal) {
      institutions.value = loadFromLocalStorage()
    }
  },
  { deep: true },
)
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar />
    </ion-header>
    <ion-content>
      <school-list
        :institutions="institutions"
        @edit-institution="openEditModel"
        @delete-institution="deleteInstitution"
      />

      <ion-modal :is-open="isAddModalOpen" css-class="my-custom-modal">
        <ion-content class="modal-content">
          <div class="form-container">
            <ion-item v-if="editMode && selectedInstitution" class="form-item">
              <ion-label position="fixed">
                Série
              </ion-label>
              <ion-input v-model="institutionForm.series" required />
            </ion-item>
            <ion-item v-if="editMode && selectedInstitution" class="form-item">
              <ion-label position="fixed">
                Turma
              </ion-label>
              <ion-input v-model="institutionForm.turmas" required />
            </ion-item>
            <ion-button id="open-toast" expand="block" @click="saveInstitution">
              {{ editMode ? 'Salvar Alterações' : 'Adicionar' }}
            </ion-button>
            <ion-toast color="success" class="toast" trigger="open-toast" message="Edição realizada com sucesso!" :duration="5000" />
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

.toast {
  position: fixed;
  bottom: 20px;
  left: 1100px;
  z-index: 1000;
  color: white;
  padding: 10px;
  border-radius: 5px;
  max-width: 200px;
  text-align: left;
  transition: opacity 0.3s ease-in-out;
}
</style>
