<template>
    <ion-list>
      <ion-item v-for="institution in institutions" :key="institution.id" @click="selectInstitution(institution)">
        <ion-label>{{ institution.name }}</ion-label>
      </ion-item>
    </ion-list>
  </template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { IonList, IonItem } from '@ionic/vue';
    import institutions from '../data/institutions';

export default defineComponent({
    name: 'InstitutionList',
    components: {
    IonList,
    IonItem,
  },

    data() {
        return {
        institutions,
    };
  },
});
</script>