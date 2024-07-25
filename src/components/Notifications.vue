<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { IonBadge, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/vue'
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

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonToast,
    IonBadge,
  },
  setup() {
    const icons = {
      homeOutline,
    }
    // Função para carregar dados do localStorage
    const saveToLocalStorage = (data: Institution[]) => {
      localStorage.setItem('institutions', JSON.stringify(data))
    }
    // Função para salvar dados no localStorage
    const loadFromLocalStorage = (): Institution[] => {
      const data = localStorage.getItem('institutions')
      return data ? JSON.parse(data) : []
    }
    // Referências para gerenciar o estado da aplicação
    const institutions = ref<Institution[]>(loadFromLocalStorage())
    const isAddModalOpen = ref(false)
    const editMode = ref(false)
    const institutionForm = ref<Institution>({ id: Date.now(), name: '', acronym: '', address: '', phone: '', email: '', description: '', schools: '', series: '', turmas: '', teachers: '', schedule: '', discipline: '' })

    // Puxa as 3 últimas instituições cadastradas
    const recentInstitutions = computed(() => institutions.value.slice(-3).reverse())

    // Abre o modal para adicionar uma nova instituição
    const openAddModel = () => {
      isAddModalOpen.value = true
      editMode.value = false
      institutionForm.value = { id: Date.now(), name: '', acronym: '', address: '', phone: '', email: '', description: '', schools: '', series: '', turmas: '', teachers: '', schedule: '', discipline: '' }
    }
    // Abre o modal para editar uma instituição existente
    const openEditModel = (item: Institution) => {
      isAddModalOpen.value = true
      editMode.value = true
      institutionForm.value = { ...item }
    }
    // Salva ou atualiza uma instituição
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
    // Deleta uma instituição
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
      icons,
      institutions,
      recentInstitutions,
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
