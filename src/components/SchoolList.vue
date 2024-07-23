<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import type { School } from '@/data/schools'

export default defineComponent({
  props: {
    schools: {
      type: Array as PropType<School[]>,
      required: true,
    },
  },
  setup(props) {
    const { schools } = toRefs(props)

    return {
      schools,
    }
  },
})
</script>

<template>
  <ion-list>
    <ion-item v-for="school in schools" :key="school.id">
      <ion-label>{{ school.name }}</ion-label>
      <ion-button slot="end" @click="$emit('viewDetauks', school)">
        Detalhes
      </ion-button>
    </ion-item>
  </ion-list>
</template>
