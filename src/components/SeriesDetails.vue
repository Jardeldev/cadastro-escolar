<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ seriesDetail.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ seriesDetail.description }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { Series } from '@/data/series';

export default defineComponent({
  props: {
    seriesDetail: {
      type: Object as PropType<Series>,
      required: true,
    },
  },
  setup(props) {
    const { seriesDetail } = toRefs(props);

    return {
      seriesDetail,
    };
  },
});
</script>
