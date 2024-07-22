<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import type { Class } from '@/data/classes'

export default defineComponent({
  props: {
    classes: {
      type: Array as PropType<Class[]>,
      required: true,
    },
  },
  setup(props) {
    const { classes } = toRefs(props)

    return {
      classes,
    }
  },
})
</script>

<template>
  <ion-list>
    <ion-item v-for="classItem in classes" :key="classItem.id">
      <ion-label>{{ classItem.name }}</ion-label>
      <ion-button slot="end" @click="$emit('view-details', classItem)">
        Detalhes
      </ion-button>
    </ion-item>
  </ion-list>
</template>
