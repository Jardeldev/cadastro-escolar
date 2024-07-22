<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import type { Turma } from '@/data/turmas'

export default defineComponent({
  props: {
    turmaDetail: {
      type: Object as PropType<Turma>,
      required: true,
    },
  },
  setup(props) {
    const { turmaDetail } = toRefs(props)

    return {
      turmaDetail,
    }
  },
})
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ turmaDetail.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ turmaDetail.description }}</p>
    </ion-card-content>
  </ion-card>
</template>
