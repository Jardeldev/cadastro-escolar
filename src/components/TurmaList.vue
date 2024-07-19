<template>
  <ion-list>
    <ion-item v-for="turma in turmas" :key="turma.id">
      <ion-label>{{ turma.name }}</ion-label>
      <ion-button slot="end" @click="viewDetails(turma)">Detalhes</ion-button>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { Turma } from '@/data/turmas';

export default defineComponent({
  props: {
    turmas: {
      type: Array as PropType<Turma[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { turmas } = toRefs(props);

    const viewDetails = (turma: Turma) => {
      emit('view-details', turma);
    };

    return {
      turmas,
      viewDetails,
    };
  },
});
</script>
