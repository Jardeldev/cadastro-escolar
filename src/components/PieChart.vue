<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js'
import type { Institution } from '../utils/api'
import { loadFromLocalStorage } from '../utils/api'

// Registrando componentes do Chart.js globalmente
ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default defineComponent({
  name: 'PieChart',
  components: {
    Pie,
  },
  setup() {
    const chartData = ref({
      labels: [] as string[],
      datasets: [
        {
          label: 'Instituições Cadastradas',
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          data: [] as number[],
        },
      ],
    })

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
        },
      },
    }

    onMounted(() => {
      const institutions: Institution[] = loadFromLocalStorage()
      console.log('Loaded institutions:', institutions) // Adicionado para verificação

      if (institutions.length > 0) {
        chartData.value.labels = institutions.map(institution => institution.name)
        chartData.value.datasets[0].data = institutions.map(() => 1)
      }
      else {
        console.warn('No institutions found in localStorage')
      }
    })

    return { chartData, chartOptions }
  },
})
</script>

<template>
  <div class="chart-container">
    <pie v-if="chartData.datasets[0].data.length" :data="chartData" :options="chartOptions" />
    <p v-else>
      No data available
    </p>
  </div>
</template>

  <style scoped>
.chart-container {
  width: 250px;
  height: 250px;
  position: relative;
  top: 60px; right: 40px;
 }
</style>
