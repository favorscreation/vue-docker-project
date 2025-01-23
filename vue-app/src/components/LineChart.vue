<template>
    <div>
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
  
  // Chart.js のスケールを登録
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  
  export default {
    name: 'LineChart',
    components: {
      Line,
    },
    props: {
      chartData: {
        type: Object,
        required: true
      },
      chartOptions: {
        type: Object,
        default: () => ({
          responsive: true,
          maintainAspectRatio: false
        })
      },
    },
    mounted() {
      this.renderChart();
    },
    watch: {
      chartData: {
        handler() {
          this.renderChart();
        },
        deep: true
      }
    },
    methods: {
      renderChart() {
        if (this.$refs.chart) {
          this.$refs.chart.renderChart(this.chartData, this.chartOptions);
        }
      }
    }
  };
  </script>
  