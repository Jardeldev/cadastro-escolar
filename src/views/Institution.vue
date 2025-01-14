<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/vue'
import { pencilOutline, trashOutline } from 'ionicons/icons'

// Interface para representar uma instituição
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

// Ícones
const icons = {
  pencilOutline,
  trashOutline,
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

// Referências para gerenciar o estado da aplicação
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
  teachers: '',
  schedule: '',
  discipline: '',
})

// Abre o modal para adicionar uma nova instituição
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
    teachers: '',
    schedule: '',
    discipline: '',
  }
}

// Abre o modal para editar uma instituição existente
function openEditModel(item: Institution) {
  isAddModalOpen.value = true
  editMode.value = true
  institutionForm.value = { ...item }
}

// Salva ou atualiza uma instituição
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
    isAddModalOpen.value = true
  }
  catch (error) {
    console.error('Error saving institution:', error)
  }
}

// Deleta uma instituição
async function deleteInstitution(item: Institution) {
  try {
    const index = institutions.value.findIndex((i: Institution) => i.id === item.id)
    institutions.value.splice(index, 1)
    saveToLocalStorage(institutions.value)
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
              Gestão de Instituições
            </ion-title>
          </ion-toolbar>
          <ion-item v-for="item in institutions" :key="item.id">
            <ion-label>Nome da Instituição: {{ item.name }}</ion-label>
            <ion-button slot="end" @click="openEditModel(item)">
              <ion-icon :icon="icons.pencilOutline" />
              Editar
            </ion-button>
            <ion-button slot="end" @click="deleteInstitution(item)">
              <ion-icon :icon="icons.trashOutline" />
              Excluir
            </ion-button>
          </ion-item>
        </ion-list>
        <div v-if="isAddModalOpen" class="form-container">
          <ion-item class="form-item">
            <ion-label position="fixed">
              Nome da Instituição *
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
              Série
            </ion-label>
            <ion-input v-model="institutionForm.series" placeholder="Adicionar escolas separadas por vírgula" />
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="fixed">
              Turma
            </ion-label>
            <ion-input v-model="institutionForm.turmas" placeholder="Adicionar escolas separadas por vírgula" />
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
          <ion-button id="open-toast" expand="block" @click="saveInstitution">
            {{ editMode ? 'Salvar Alterações' : 'Adicionar' }}
          </ion-button>
          <ion-toast color="success" class="toast" trigger="open-toast" message="Instituição adicionada com sucesso!" :duration="5000" />
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
