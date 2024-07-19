<template>
  <Menu />
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestão de Classes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button expand="block" @click="openAddModel">
        <ion-icon slot="start" name="add-outline"></ion-icon>
        Adicionar Classe
      </ion-button>
      <ClassList :classes="classes" @view-details="viewClassDetails" />
      <ClassDetails v-if="selectedClass" :class-detail="selectedClass" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { fetchClasses } from '@/utils/api';
import ClassList from '@/components/ClassList.vue';
import ClassDetails from '@/components/ClassDetails.vue';
import Menu from '@/components/Menu.vue';

// Define the interface for the class detail
interface ClassDetail {
  id: number;
  name: string;
  // Add other properties as needed
}

export default defineComponent({
  components: {
    ClassList,
    ClassDetails,
    Menu,
  },
  setup() {
    const classes = ref(fetchClasses());
    const selectedClass = ref<ClassDetail | null>(null);

    const viewClassDetails = (classItem: ClassDetail) => {
      selectedClass.value = classItem;
    };

    const openAddModel = () => {
      // Lógica para abrir o modal de adicionar classe
    };

    return {
      classes,
      selectedClass,
      viewClassDetails,
      openAddModel,
    };
  },
});
</script>
