<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/vue'
import { fetchInstitutions } from '@/utils/api'
import type { Institution } from '@/types/Institution'

export interface Institution {
  id: number
  name: string
  acronym: string
  address: string
  phone: string
  email: string
  description: string
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
    const institutions = ref<Institution[]>(fetchInstitutions())
    const isAddModalOpen = ref(false)
    const editMode = ref(false)
    const institutionForm = ref<Institution>({ id: null, name: '', acronym: '', address: '', phone: '', email: '', description: '' })

    const openAddModel = () => {
      isAddModalOpen.value = true
      editMode.value = false
      institutionForm.value = { id: null, name: '', acronym: '', address: '', phone: '', email: '', description: '' }
    }

    const openEditModel = (item: Institution) => {
      isAddModalOpen.value = true
      editMode.value = true
      institutionForm.value = { ...item }
    }

    const saveInstitution = async () => {
      try {
        if (editMode.value) {
          const index = institutions.value.findIndex((i: Institution) => i.id === institutionForm.value.id)
          institutions.value[index] = { ...institutionForm.value }
        }
        else {
          const newInstitution: Institution = { ...institutionForm.value, id: Date.now() }
          institutions.value.push(newInstitution)
        }
        await new Promise(resolve => setTimeout(resolve, 500))
        isAddModalOpen.value = false
      }
      catch (error) {
        console.error('Error saving institution:', error)
      }
    }

    const deleteInstitution = async (item: Institution) => {
      try {
        const index = institutions.value.findIndex((i: Institution) => i.id === item.id)
        institutions.value.splice(index, 1)
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      catch (error) {
        console.error('Error deleting institution:', error)
      }
    }

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
      <ion-button expand="block" @click="openAddModel">
        <ion-icon slot="start" name="add-outline" />
        Adicionar Instituição
      </ion-button>
      <ion-list>
        <ion-item v-for="item in institutions" :key="item.id">
          <ion-label>{{ item.name }}</ion-label>
          <ion-button slot="end" @click="openEditModel(item)">
            <ion-icon name="pencil-outline" />
          </ion-button>
          <ion-button slot="end" @click="deleteInstitution(item)">
            <ion-icon name="trash-outline" />
          </ion-button>
        </ion-item>
      </ion-list>
      <div v-if="isAddModalOpen" class="form-container">
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
        <ion-button expand="block" @click="saveInstitution">
          {{ editMode ? 'Salvar Alterações' : 'Adicionar' }}
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

  <style scoped>
  .form-container {
    padding: 2.0em;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-item {
    width: 100%;
    max-width: 400px;
    margin: 5px 0;
  }

  ion-item.form-item {
    --inner-padding-start: 8px;
    --inner-padding-end: 8px;
    --border-radius: 10px;
    --padding-bottom: 8px;
    --padding-top: 8px;
  }

  ion-button {
    margin-top: 15px;
    width: 100%;
    max-width: 400px;
    --border-radius: 10px;
  }
  </style>
