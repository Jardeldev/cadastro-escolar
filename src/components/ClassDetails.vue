<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import type { Class } from '@/data/classes'

export default defineComponent({
  props: {
    classDetail: {
      type: Object as PropType<Class>,
      required: true,
    },
  },
  setup(props) {
    const { classDetail } = toRefs(props)

    return {
      classDetail,
    }
  },
})
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ classDetail.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ classDetail.description }}</p>
    </ion-card-content>
  </ion-card>
</template>
