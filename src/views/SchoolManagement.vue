<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonToast, IonToolbar } from '@ionic/vue'
import InstitutionList from '@/components/InstitutionList.vue'

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

// Função para carregar dados do localStorage
function loadFromLocalStorage(): Institution[] {
  const data = localStorage.getItem('institutions')
  return data ? JSON.parse(data) : []
}

// Função para salvar dados no localStorage
function saveToLocalStorage(data: Institution[]) {
  localStorage.setItem('institutions', JSON.stringify(data))
}

const institutions: Institution[] | any = ref(loadFromLocalStorage())
const selectedInstitution = ref<Institution | null>(null)
const editMode = ref(false)
const institutionForm = ref<{ name: string, series: string, turmas: string }>({ name: '', series: '', turmas: '' })

// Função para abrir o modal de edição
function openEditModel(item: Institution) {
  selectedInstitution.value = item
  institutionForm.value = { name: item.schools, series: item.series, turmas: item.turmas }
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
        institutions.value[index] = {
          ...institutions.value[index],
          schools: institutionForm.value.name,
          series: institutionForm.value.series,
          turmas: institutionForm.value.turmas,
        }
      }
    }
    else {
      institutions.value.push({
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
      })
    }
    saveToLocalStorage(institutions.value)
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

// Carrega os dados do localStorage quando o componente é montado
onMounted(() => {
  institutions.value = loadFromLocalStorage()
})

// Assiste mudanças no localStorage e atualiza as instituições se necessário
watch(
  institutions,
  (newVal: Institution[]) => {
    saveToLocalStorage(newVal)
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
      <institution-list
        :institutions="institutions"
        @edit-institution="openEditModel"
        @delete-institution="deleteInstitution"
      />

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
          <ion-button id="open-toast" expand="block" @click="saveInstitution">
            {{ editMode ? 'Salvar Alterações' : 'Adicionar' }}
          </ion-button>
          <ion-toast color="success" class="toast" trigger="open-toast" message="Edição realizada com sucesso!" :duration="5000" />
        </div>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.accordion-item {
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
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
