<template>
  <ion-list>
    <ion-item v-for="school in schools" :key="school.id">
      <ion-label>{{ school.name }}</ion-label>
      <ion-button slot="end" @click="$emit('view-details', school)">Detalhes</ion-button>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { School } from '@/data/schools';

export default defineComponent({
  props: {
    schools: {
      type: Array as PropType<School[]>,
      required: true,
    },
  },
  setup(props) {
    const { schools } = toRefs(props);

    return {
      schools,
    };
  },
});
</script>
