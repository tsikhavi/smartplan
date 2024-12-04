'use client'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js'

// Register the required components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  labels: string[] // Labels for the x-axis
  dataPoints: number[] // Data values for the bars
  barColor: string // Tailwind-compatible RGBA color
  title: string // Title for the bar chart
}

const BarChart: React.FC<BarChartProps> = ({
  labels,
  dataPoints,
  barColor,
  title,
}) => {
  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Кол-во чеков',
        data: dataPoints,
        backgroundColor: barColor,
        borderColor: barColor,
        borderWidth: 0.75,
        hoverBackgroundColor: 'rgba(59, 130, 246, 0.9)', // Slightly brighter color on hover
        hoverBorderColor: 'rgba(59, 130, 246, 1)',
        barThickness: 8,
        maxBarThickness: 10,
        minBarLength: 6,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 12, // Customize the title font size
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) =>
            `${new Intl.NumberFormat('ru-RU').format(
              Number(tooltipItem.raw)
            )} ₽`, // Format tooltips with Russian locale
        },
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280', // Tailwind gray-500
          font: {
            size: 8, // Font size for x-axis ticks
          },
        },
      },
      y: {
        grid: {
          drawOnChartArea: true,
          lineWidth: 1,
          color: '#d1d5db', // Tailwind gray-300
        },
        ticks: {
          font: {
            size: 10, // Font size for y-axis ticks
          },
          callback: (tickValue) =>
            `${new Intl.NumberFormat('ru-RU').format(Number(tickValue))} `, // Russian locale formatting
        },
        // Move `beginAtZero` to the correct scale configuration
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false, // Make the chart responsive to the container size
  }

  return (
    <div className="bg-white shadow w-full relative z-0 h-[200px]">
      {/* Set a fixed height for the chart */}
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart
