<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/vue'

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
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
  },
  setup() {
    // Funções para manipular o localStorage
    const saveToLocalStorage = (data: Institution[]) => {
      localStorage.setItem('institutions', JSON.stringify(data))
    }

    const loadFromLocalStorage = (): Institution[] => {
      const data = localStorage.getItem('institutions')
      return data ? JSON.parse(data) : []
    }

    const institutions = ref<Institution[]>(loadFromLocalStorage())
    const isAddModalOpen = ref(false)
    const editMode = ref(false)
    const institutionForm = ref<Institution>({ id: Date.now(), name: '', acronym: '', address: '', phone: '', email: '', description: '', schools: '', series: '', turmas: '' })

    const openAddModel = () => {
      isAddModalOpen.value = true
      editMode.value = false
      institutionForm.value = { id: Date.now(), name: '', acronym: '', address: '', phone: '', email: '', description: '', schools: '', series: '', turmas: '' }
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

    const deleteInstitution = async (item: Institution) => {
      try {
        const index = institutions.value.findIndex(i => i.id === item.id)
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
            <ion-label>Nome da Instituição: {{ item.name }} | Escola: {{ item.schools }} | Séries: {{ item.series }} | Turmas: {{ item.turmas }}</ion-label>
            <ion-button slot="end" @click="openEditModel(item)">
              <ion-icon name="pencil-outline" />
              Editar
            </ion-button>
          </ion-item>
        </ion-list>
        <div v-if="isAddModalOpen" class="form-container">
          <ion-item class="form-item">
            <ion-label position="fixed">
              Turmas
            </ion-label>
            <ion-input v-model="institutionForm.turmas" placeholder="Adicionar escolas separadas por vírgula" />
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
