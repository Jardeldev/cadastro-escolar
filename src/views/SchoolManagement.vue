<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/vue'
import { fetchSchools } from '@/utils/api'
import SchoolList from '@/components/SchoolList.vue'
import SchoolDetails from '@/components/SchoolDetails.vue'

interface School {
  id: number
  name: string
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
    SchoolList,
    SchoolDetails,
  },
  setup() {
    const schools = ref(fetchSchools())
    const selectedSchool = ref(null)
    const isAddModalOpen = ref(false)
    const editMode = ref(false)
    const schoolForm = ref<School>({ id: 0, name: '', address: '', phone: '', email: '', description: '' })

    const viewSchoolDetails = (school) => {
      selectedSchool.value = school
    }

    const openAddModel = () => {
      isAddModalOpen.value = true
      editMode.value = false
      schoolForm.value = { id: 0, name: '', address: '', phone: '', email: '', description: '' }
    }

    const openEditModel = (item: School) => {
      isAddModalOpen.value = true
      editMode.value = true
      schoolForm.value = { ...item }
    }

    const addModalDismiss = () => {
      isAddModalOpen.value = false
    }

    const saveSchool = async () => {
      try {
        if (editMode.value) {
          const index = schools.value.findIndex(i => i.id === schoolForm.value.id)
          schools.value[index] = { ...schoolForm.value }
        }
        else {
          const newSchool: School = { ...schoolForm.value, id: Date.now() }
          schools.value.push(newSchool)
        }
        await new Promise(resolve => setTimeout(resolve, 500))
        addModalDismiss()
      }
      catch (error) {
        console.error('Error saving school:', error)
      }
    }

    const deleteSchool = async (item: School) => {
      try {
        const index = schools.value.findIndex(i => i.id === item.id)
        schools.value.splice(index, 1)
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      catch (error) {
        console.error('Error deleting school:', error)
      }
    }

    return {
      schools,
      selectedSchool,
      viewSchoolDetails,
      isAddModalOpen,
      editMode,
      schoolForm,
      openAddModel,
      openEditModel,
      addModalDismiss,
      saveSchool,
      deleteSchool,
    }
  },
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestão de Escolas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-modal :is-open="isAddModalOpen" css-class="my-custom-modal">
        <ion-header />
        <ion-content class="modal-content">
          <div class="form-container">
            <ion-item class="form-item">
              <ion-label position="fixed">
                Nome *
              </ion-label>
              <ion-input v-model="schoolForm.name" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Endereço *
              </ion-label>
              <ion-input v-model="schoolForm.address" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Telefone *
              </ion-label>
              <ion-input v-model="schoolForm.phone" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                E-mail *
              </ion-label>
              <ion-input v-model="schoolForm.email" type="email" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Descrição
              </ion-label>
              <ion-textarea v-model="schoolForm.description" />
            </ion-item>
            <ion-button expand="block" @click="saveSchool">
              {{ editMode ? 'Salvar Alterações' : 'Adicionar' }}
            </ion-button>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
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

.searchbar {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  --border-radius: 10px;
}
</style>
