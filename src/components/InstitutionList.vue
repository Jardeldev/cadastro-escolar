<template>
  <ion-list>
    <ion-item v-for="institution in institutions" :key="institution.id">
      <ion-label>{{ institution.name }}</ion-label>
      <ion-button slot="end" @click="$emit('view-details', institution)">Detalhes</ion-button>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { Institution } from '@/data/institutions';

export default defineComponent({
  props: {
    institutions: {
      type: Array as PropType<Institution[]>,
      required: true,
    },
  },
  setup(props) {
    const { institutions } = toRefs(props);

    return {
      institutions,
    };
  },
});
</script>
