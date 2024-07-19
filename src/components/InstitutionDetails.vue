<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import type { Institution } from '@/data/institutions'

export default defineComponent({
  props: {
    institutionDetail: {
      type: Object as PropType<Institution>,
      required: true,
    },
  },
  setup(props) {
    const { institutionDetail } = toRefs(props)

    return {
      institutionDetail,
    }
  },
})
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ institutionDetail.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ institutionDetail.description }}</p>
      <p><strong>Endereço:</strong> {{ institutionDetail.address }}</p>
      <p><strong>Telefone:</strong> {{ institutionDetail.phone }}</p>
      <p><strong>Email:</strong> {{ institutionDetail.email }}</p>
    </ion-card-content>
  </ion-card>
</template>
