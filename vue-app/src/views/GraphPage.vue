<template>
  <div class="parent-container">
    <h1>1月の電気使用量</h1>
    <div class="chart-container">
      <Line ref="lineChart" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js のスケールを登録
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default {
  name: 'GraphPage',
  components: {
    Line,
  },
  data() {
    return {
      chartData: {
        labels: Array.from({ length: 31 }, (_, i) => `${i + 1}日`),
        datasets: [
          {
            label: '電気使用量 (kWh)',
            backgroundColor: '#f87979',
            data: [
              20, 22, 18, 24, 23, 25, 19, 21, 20, 22, 
              18, 24, 23, 25, 19, 21, 20, 22, 18, 24, 
              23, 25, 19, 21, 20, 22, 18, 24, 23, 25, 
              19
            ],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 30,
            ticks: {
              stepSize: 5
            },
            title: {
              display: true,
              text: '電気使用量 (kWh)'
            }
          }
        }
      }
    };
  },
  updated() {
    this.$nextTick(() => {
      const canvas = this.$refs.lineChart.$el.querySelector('canvas');
      if (canvas) {
        canvas.style.height = '100%';
        canvas.style.width = '100%';
      }
    });
  }
};
</script>

<style scoped>
.parent-container {
  width: 90vw; /* ビューポート全体の幅 */
  height: 90vh; /* ビューポート全体の高さ */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  margin-bottom: 20px;
}
.chart-container {
  width: 100% !important; /* グラフの幅を100%に設定 */
  height: 100% !important; /* グラフの高さを100%に設定 */
  position: relative;
}
</style>
