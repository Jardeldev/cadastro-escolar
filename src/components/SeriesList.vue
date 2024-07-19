<template>
  <ion-list>
    <ion-item v-for="seriesItem in series" :key="seriesItem.id">
      <ion-label>{{ seriesItem.name }}</ion-label>
      <ion-button slot="end" @click="$emit('view-details', seriesItem)">Detalhes</ion-button>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { Series } from '@/data/series';

export default defineComponent({
  props: {
    series: {
      type: Array as PropType<Series[]>,
      required: true,
    },
  },
  setup(props) {
    const { series } = toRefs(props);

    return {
      series,
    };
  },
});
</script>
