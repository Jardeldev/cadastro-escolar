<script lang="ts">
import { defineComponent, ref } from 'vue'
import { fetchTurmas } from '@/utils/api'
import TurmaList from '@/components/TurmaList.vue'
import TurmaDetails from '@/components/TurmaDetails.vue'

export default defineComponent({
  components: {
    TurmaList,
    TurmaDetails,
  },
  setup() {
    const turmas = ref(fetchTurmas())
    const selectedTurma = ref(null)

    const viewTurmaDetails = (turma) => {
      selectedTurma.value = turma
    }

    const openAddModel = () => {
      // Lógica para abrir o modal de adicionar turma
    }

    return {
      turmas,
      selectedTurma,
      viewTurmaDetails,
      openAddModel,
    }
  },
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestão de Turmas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button expand="block" @click="openAddModel">
        <ion-icon slot="start" name="add-outline" />
        Adicionar Turma
      </ion-button>
      <turma-list :turmas="turmas" @view-details="viewTurmaDetails" />
      <turma-details v-if="selectedTurma" :turma-detail="selectedTurma" />
    </ion-content>
  </ion-page>
</template>
