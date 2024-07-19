<template>
   <Menu />
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Gestão de Escolas</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="modal-content">
      <div class="form-container">
        <SchoolList :schools="schools" @view-details="viewSchoolDetails" />
        <SchoolDetails v-if="selectedSchool" :school-detail="selectedSchool" />
        <ion-button expand="block" @click="openAddModel">
          <ion-icon slot="start" name="add-outline"></ion-icon>
          Adicionar Escola
        </ion-button>
    </div>
      </ion-content>
      
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { fetchSchools } from '@/utils/api';
  import SchoolList from '@/components/SchoolList.vue';
  import SchoolDetails from '@/components/SchoolDetails.vue';
  import Menu from '@/components/Menu.vue';
  
  interface School {
  id: number;
  name: string;
}

  export default defineComponent({
    components: {
      SchoolList,
      SchoolDetails,
      Menu,
    },
    setup() {
      const schools = ref(fetchSchools());
      const selectedSchool = ref<School | null>(null);
  
      const viewSchoolDetails = (school: School) => {
        selectedSchool.value = school;
    };
  
      const openAddModel = () => {
        // Lógica para abrir o modal de adicionar escola
      };
  
      return {
        schools,
        selectedSchool,
        viewSchoolDetails,
        openAddModel,
      };
    },
  });
  </script>
  
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