<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ schoolDetail.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ schoolDetail.description }}</p>
      <p><strong>Endereço:</strong> {{ schoolDetail.address }}</p>
      <p><strong>Telefone:</strong> {{ schoolDetail.phone }}</p>
      <p><strong>Email:</strong> {{ schoolDetail.email }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { School } from '@/data/schools';

export default defineComponent({
  props: {
    schoolDetail: {
      type: Object as PropType<School>,
      required: true,
    },
  },
  setup(props) {
    const { schoolDetail } = toRefs(props);

    return {
      schoolDetail,
    };
  },
});
</script>
