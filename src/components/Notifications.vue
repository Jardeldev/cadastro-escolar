<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { IonBadge, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonToast, IonToolbar } from '@ionic/vue'
import { homeOutline } from 'ionicons/icons'

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

// Função para carregar dados do localStorage
function loadFromLocalStorage(): Institution[] {
  const data = localStorage.getItem('institutions')
  return data ? JSON.parse(data) : []
}

// Função para salvar dados no localStorage
function saveToLocalStorage(data: Institution[]) {
  localStorage.setItem('institutions', JSON.stringify(data))
}

// Puxa as 3 últimas instituições cadastradas
const recentInstitutions = computed(() => institutions.value.slice(-3).reverse())

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
function _openEditModel(item: Institution) {
  isAddModalOpen.value = true
  editMode.value = true
  institutionForm.value = { ...item }
}

// Salva ou atualiza uma instituição
async function _saveInstitution() {
  try {
    if (editMode.value) {
      const index = institutions.value.findIndex(i => i.id === institutionForm.value.id)
      if (index !== -1) {
        institutions.value[index] = { ...institutionForm.value }
      }
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

// Deleta uma instituição
async function _deleteInstitution(item: Institution) {
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

// Carregar dados do localStorage quando o componente for montado
onMounted(() => {
  institutions.value = loadFromLocalStorage()
})

// Ícones para o componente
const icons = {
  homeOutline,
}
</script>

<template>
  <ion-page>
    <ion-header />
    <ion-badge v-for="item in recentInstitutions" :key="item.id" color="danger" class="badge">
      {{ recentInstitutions.length }}
    </ion-badge>
    <ion-list class="notifications">
      <ion-item v-for="item in recentInstitutions" :key="item.id">
        <ion-icon :icon="icons.homeOutline" />
        <ion-label>
          <h2>{{ item.name }}</h2>
          <p>{{ item.acronym }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-page>
</template>

<style scoped>
ion-icon {
  color: gray;
  background-color: transparent;
  padding: 8px;
}

ion-label, ion-toast {
  padding-left: 12px;
}

.notifications {
  position: absolute;
  top: 50px;
  right: 30px;
  width: 300px;
  height: 300px;
}

.badge {
  position: absolute;
  bottom: 546px;
  right: 145px;
  height: 20px;
}
</style>
