<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { IonAvatar, IonButton, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/vue'
import { close, closeCircle, pin } from 'ionicons/icons'
import { maskito as vMaskito } from '@maskito/vue'
import { maskitoTransform } from '@maskito/core'

// Interface que define a estrutura de uma instituição
export interface Institution {
  id: number
  name: string
  acronym: string
  address: string
  phone: string
  email: string
  description: string
  schools: string[]
  series: string[]
  turmas: string[]
  teachers: string[]
  schedule: string[]
  discipline: string[]
}

const phoneOptions = {
  mask: ['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  elementPredicate: (el: HTMLIonInputElement) => {
    return new Promise((resolve) => {
      requestAnimationFrame(async () => {
        const input = await el.getInputElement()
        resolve(input)
      })
    })
  },
}
// If you need to set an initial value, you can use maskitoTransform to ensure the value is valid
const myPhoneNumber = ref(maskitoTransform('5555551212', phoneOptions))

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
const editMode = ref(false)
const institutionForm = ref<Institution>({
  id: Date.now(),
  name: '',
  acronym: '',
  address: '',
  phone: '',
  email: '',
  description: '',
  schools: [],
  series: [],
  turmas: [],
  teachers: [],
  schedule: [],
  discipline: [],
})

const inputValues = ref<Record<keyof Institution, string>>({
  schools: '',
  series: '',
  turmas: '',
  teachers: '',
  schedule: '',
  discipline: '',
})

// Abre o modal para adicionar uma nova instituição
function _openAddModel() {
  editMode.value = false
  institutionForm.value = {
    id: Date.now(),
    name: '',
    acronym: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    schools: [],
    series: [],
    turmas: [],
    teachers: [],
    schedule: [],
    discipline: [],
  }
}

// Abre o modal para editar uma instituição existente
function _openEditModel(item: Institution) {
  editMode.value = true
  institutionForm.value = { ...item }
}

// Salva ou atualiza uma instituição
async function saveInstitution() {
  try {
    if (!validateRequiredFields()) {
      return
    }

    if (editMode.value) {
      const index = institutions.value.findIndex((i: Institution) => i.id === institutionForm.value.id)
      if (index !== -1) {
        institutions.value[index] = { ...institutionForm.value }
      }
    }
    else {
      institutions.value.push({ ...institutionForm.value, id: Date.now() })
    }
    saveToLocalStorage(institutions.value)
  }
  catch (error) {
    console.error('Error saving institution:', error)
  }
}

function validateRequiredFields(): boolean {
  let isValid = true
  // Campos obrigatórios
  const requiredFields = ['name', 'acronym', 'address', 'phone', 'email'] as (keyof Institution)[]

  requiredFields.forEach((field) => {
    const input = document.querySelector(`[data-field="${field}"]`) as HTMLIonInputElement
    if (input) {
      if (!institutionForm.value[field]) {
        input.classList.add('ion-invalid')
        isValid = false
      }
      else {
        input.classList.remove('ion-invalid')
      }
    }
  })

  return isValid
}

// Deleta uma instituição
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

function addItem(field: keyof Institution, value: string) {
  if (value.trim()) {
    // Verifica se o campo é um array
    if (Array.isArray(institutionForm.value[field])) {
      (institutionForm.value[field] as string[]).push(value.trim())
    }
    else {
      // Se o campo não é um array, inicializa como um array de strings
      institutionForm.value[field] = [value.trim()]
    }
    inputValues.value[field] = ''
  }
}

function removeItem(field: keyof Institution, index: number) {
  if (Array.isArray(institutionForm.value[field])) {
    (institutionForm.value[field] as string[]).splice(index, 1)
  }
}

function handleInput(field: keyof Institution, event: Event) {
  const input = event.target as HTMLInputElement
  const value = input.value

  if (value.endsWith(',')) {
    const items = value.split(',').filter(item => item.trim())
    items.forEach(item => addItem(field, item.trim()))
    input.value = ''
  }
  else {
    inputValues.value[field] = value
  }
}

// Carrega as instituições ao montar o componente
onMounted(() => {
  institutions.value = loadFromLocalStorage()
})

// Observa mudanças no localStorage e atualiza a lista de instituições
watch(
  () => institutions.value,
  (newVal: Institution[], oldVal: Institution[]) => {
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
      <ion-toolbar>
        <ion-title>Gestão de Instituições</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-header />
      <ion-content class="modal-content">
        <div class="form-container">
          <ion-item class="form-item">
            <ion-label position="fixed">
              Nome *
            </ion-label>
            <ion-input v-model="institutionForm.name" data-field="name" required />
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="fixed">
              Sigla *
            </ion-label>
            <ion-input v-model="institutionForm.acronym" data-field="acronym" required />
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="fixed">
              Endereço *
            </ion-label>
            <ion-input v-model="institutionForm.address" data-field="address" required />
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="fixed">
              Telefone *
            </ion-label>
            <ion-input v-model="institutionForm.phone" v-maskito="phoneOptions" placeholder="(99) 9 9999-9999" data-field="phone" required />
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="fixed">
              E-mail *
            </ion-label>
            <ion-input v-model="institutionForm.email" type="email" data-field="email" required />
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
            <ion-input
              :value="inputValues.schools"
              placeholder="Adicionar escolas separadas por vírgula"
              @keyup="handleInput('schools', $event)"
            />
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
          <ion-toast color="success" class="toast" trigger="open-toast" message="Instituição adicionada com sucesso!" :duration="5000" />
        </div>
      </ion-content>
    </ion-content>
    <ion-chip v-for="(school, index) in institutionForm.schools" :key="index" class="chip-container">
      <ion-label class="chip-container">
        {{ school }}
      </ion-label>
      <ion-icon :icon="closeCircle" @click="removeItem('schools', index)" />
    </ion-chip>
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
  max-width: 500px;
  margin: 5px 0; /* Diminuindo o espaçamento vertical */
}

ion-item.form-item {
  --inner-padding-start: 8px; /* Ajustando o padding interno */
  --inner-padding-end: 8px;
  --border-radius: 10px; /* Borda arredondada */
  --padding-bottom: 8px;
  --padding-top: 8px;
  --min-height: 60px;
}

ion-input,
ion-textarea {
  --padding-top: 0px;
  --padding-bottom: 0px;
  max-height: 150px;
  overflow-y: auto;
}

ion-textarea {
  resize: vertical;
}

.chip-container {
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 5px;
  width: 100%;
  max-width: 130px;
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

.ion-invalid {
  border: 1px solid red !important;
}
</style>
