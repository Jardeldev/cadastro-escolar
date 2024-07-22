<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import type { Series } from '@/data/series'

export default defineComponent({
  props: {
    seriesDetail: {
      type: Object as PropType<Series>,
      required: true,
    },
  },
  setup(props) {
    const { seriesDetail } = toRefs(props)

    return {
      seriesDetail,
    }
  },
})
</script>

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
