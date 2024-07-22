<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/vue'
import { fetchClasses } from '@/utils/api'
import ClassList from '@/components/ClassList.vue'
import ClassDetails from '@/components/ClassDetails.vue'

interface Class {
  id: number
  name: string
  description: string
}

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ClassList,
    ClassDetails,
  },
  setup() {
    const classes = ref(fetchClasses())
    const selectedClass = ref(null)
    const isAddModalOpen = ref(false)
    const editMode = ref(false)
    const classForm = ref<Class>({ id: 0, name: '', description: '' })

    const viewClassDetails = (classItem) => {
      selectedClass.value = classItem
    }

    const openAddModel = () => {
      isAddModalOpen.value = true
      editMode.value = false
      classForm.value = { id: 0, name: '', description: '' }
    }

    const openEditModel = (item: Class) => {
      isAddModalOpen.value = true
      editMode.value = true
      classForm.value = { ...item }
    }

    const addModalDismiss = () => {
      isAddModalOpen.value = false
    }

    const saveClass = async () => {
      try {
        if (editMode.value) {
          const index = classes.value.findIndex(i => i.id === classForm.value.id)
          classes.value[index] = { ...classForm.value }
        }
        else {
          const newClass: Class = { ...classForm.value, id: Date.now() }
          classes.value.push(newClass)
        }
        await new Promise(resolve => setTimeout(resolve, 500))
        addModalDismiss()
      }
      catch (error) {
        console.error('Error saving class:', error)
      }
    }

    const deleteClass = async (item: Class) => {
      try {
        const index = classes.value.findIndex(i => i.id === item.id)
        classes.value.splice(index, 1)
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      catch (error) {
        console.error('Error deleting class:', error)
      }
    }

    return {
      classes,
      selectedClass,
      viewClassDetails,
      isAddModalOpen,
      editMode,
      classForm,
      openAddModel,
      openEditModel,
      addModalDismiss,
      saveClass,
      deleteClass,
    }
  },
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestão de Turmas</ion-title>
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
              <ion-input v-model="classForm.name" required />
            </ion-item>
            <ion-item class="form-item">
              <ion-label position="fixed">
                Descrição
              </ion-label>
              <ion-textarea v-model="classForm.description" />
            </ion-item>
            <ion-button expand="block" @click="saveClass">
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
