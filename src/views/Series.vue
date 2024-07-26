<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { pencilOutline } from 'ionicons/icons'

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
function saveToLocalStorage(data: Institution[]) {
  localStorage.setItem('institutions', JSON.stringify(data))
}

function loadFromLocalStorage(): Institution[] {
  const data = localStorage.getItem('institutions')
  return data ? JSON.parse(data) : []
}

const icons = { pencilOutline }

const institutions = ref<Institution[]>(loadFromLocalStorage())
const isAddModalOpen = ref(false)
const editMode = ref(false)
const institutionForm = ref<Institution>({
  id: Date.now(),
  name: '',
  acronym: '',
  address: '',
  phone: '',
  email: '',
  description: '',
  schools: '',
  series: '',
  turmas: '',
})

// Função para abrir o modal de adição
function _openAddModel() {
  isAddModalOpen.value = true
  editMode.value = false
  institutionForm.value = {
    id: Date.now(),
    name: '',
    acronym: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    schools: '',
    series: '',
    turmas: '',
  }
}

// Função para abrir o modal de edição
function openEditModel(item: Institution) {
  isAddModalOpen.value = true
  editMode.value = true
  institutionForm.value = { ...item }
}

// Função para salvar uma instituição (adicionar ou editar)
async function saveInstitution() {
  try {
    if (editMode.value) {
      const index = institutions.value.findIndex((i: Institution) => i.id === institutionForm.value.id)
      institutions.value[index] = { ...institutionForm.value }
    }
    else {
      institutions.value.push({ ...institutionForm.value })
    }
    saveToLocalStorage(institutions.value)
    isAddModalOpen.value = false
  }
  catch (error) {
    console.error('Error saving institution:', error)
  }
}

// Função para excluir uma instituição
async function _deleteInstitution(item: Institution) {
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
</script>

<template>
  <ion-page>
    <ion-header />
    <ion-content>
      <div class="form-container">
        <ion-list>
          <ion-toolbar>
            <ion-title class="title">
              Gestão de Séries
            </ion-title>
          </ion-toolbar>
          <ion-item v-for="item in institutions" :key="item.id">
            <ion-label>
              Nome da Instituição: {{ item.name }} | Escola: {{ item.schools }} | Séries: {{ item.series }} | Turmas: {{ item.turmas }}
            </ion-label>
            <ion-button slot="end" @click="openEditModel(item)">
              <ion-icon :icon="icons.pencilOutline" />
              Editar
            </ion-button>
          </ion-item>
        </ion-list>
        <div v-if="isAddModalOpen" class="form-container">
          <ion-item class="form-item">
            <ion-label position="fixed">
              Turmas
            </ion-label>
            <ion-input v-model="institutionForm.turmas" placeholder="Adicionar turmas separadas por vírgula" />
          </ion-item>
          <ion-button expand="block" @click="saveInstitution">
            {{ editMode ? 'Salvar Alterações' : 'Adicionar' }}
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.title {
  text-align: center;
}

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
