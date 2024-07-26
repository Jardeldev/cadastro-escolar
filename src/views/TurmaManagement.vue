<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/vue'
import TurmaList from '@/components/TurmaList.vue'

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
  teachers: string
  schedule: string
  discipline: string
}

// Funções para manipular o localStorage
function loadFromLocalStorage(): Institution[] {
  const data = localStorage.getItem('institutions')
  return data ? JSON.parse(data) : []
}

function saveToLocalStorage(data: Institution[]) {
  localStorage.setItem('institutions', JSON.stringify(data))
}

// Estado reativo
const institutions = ref<Institution[]>(loadFromLocalStorage())
const selectedInstitution = ref<Institution | null>(null)
const isAddModalOpen = ref(false)
const editMode = ref(false)
const institutionForm = ref<{ name: string, series: string, turmas: string, teachers: string, schedule: string, discipline: string }>({
  name: '',
  series: '',
  turmas: '',
  teachers: '',
  schedule: '',
  discipline: '',
})

// Funções para abrir o modal de adição
function _openAddModel() {
  isAddModalOpen.value = true
  editMode.value = false
  institutionForm.value = {
    name: '',
    series: '',
    turmas: '',
    teachers: '',
    schedule: '',
    discipline: '',
  }
  selectedInstitution.value = null
}

// Função para abrir o modal de edição
function openEditModel(item: Institution) {
  selectedInstitution.value = item
  institutionForm.value = {
    name: item.schools,
    series: item.series,
    turmas: item.turmas,
    teachers: item.teachers,
    schedule: item.schedule,
    discipline: item.discipline,
  }
  isAddModalOpen.value = true
  editMode.value = true
}

// Função para salvar a instituição
async function saveInstitution() {
  if (!selectedInstitution.value)
    return

  try {
    if (editMode.value) {
      const index = institutions.value.findIndex((i: Institution) => i.id === selectedInstitution.value?.id)
      if (index !== -1) {
        institutions.value[index] = {
          ...institutions.value[index],
          schools: institutionForm.value.name,
          series: institutionForm.value.series,
          turmas: institutionForm.value.turmas,
          teachers: institutionForm.value.teachers,
          schedule: institutionForm.value.schedule,
          discipline: institutionForm.value.discipline,
        }
      }
    }
    else {
      institutions.value.push({
        ...institutionForm.value,
        id: Date.now(),
        name: '',
        acronym: '',
        address: '',
        phone: '',
        email: '',
        description: '',
        schools: institutionForm.value.name,
        series: institutionForm.value.series,
        turmas: institutionForm.value.turmas,
        teachers: institutionForm.value.teachers,
        schedule: institutionForm.value.schedule,
        discipline: institutionForm.value.discipline,
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

// Observador para monitorar mudanças no localStorage
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
