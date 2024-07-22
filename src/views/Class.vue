<script lang="ts">
import { defineComponent, ref } from 'vue'
import { fetchClasses } from '@/utils/api'
import ClassList from '@/components/ClassList.vue'
import ClassDetails from '@/components/ClassDetails.vue'

// Define the interface for the class detail
interface ClassDetail {
  id: number
  name: string
  // Add other properties as needed
}

export default defineComponent({
  components: {
    ClassList,
    ClassDetails,
  },
  setup() {
    const classes = ref(fetchClasses())
    const selectedClass = ref<ClassDetail | null>(null)

    const viewClassDetails = (classItem: ClassDetail) => {
      selectedClass.value = classItem
    }

    const openAddModel = () => {
      // Lógica para abrir o modal de adicionar classe
    }

    return {
      classes,
      selectedClass,
      viewClassDetails,
      openAddModel,
    }
  },
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestão de Classes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="form-container">
        <class-list :classes="classes" @view-details="viewClassDetails" />
        <class-details v-if="selectedClass" :class-detail="selectedClass" />
        <ion-button expand="block" @click="openAddModel">
          <ion-icon slot="start" name="add-outline" />
          Adicionar Classe
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
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
