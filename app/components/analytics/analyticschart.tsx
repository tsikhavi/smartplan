'use client'
import React, { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Add PointElement
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartDataset,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Register PointElement
  Title,
  Tooltip,
  Legend
)

const AnalyticsChart: React.FC = () => {
  const [activeDatasets, setActiveDatasets] = useState([
    true,
    true,
    true,
    true,
    true,
  ])

  const toggleDataset = (index: number) => {
    setActiveDatasets((prev) =>
      prev.map((active, i) => (i === index ? !active : active))
    )
  }

  const data: ChartData<'bar' | 'line', number[], string> = {
    labels: [
      '24.01.2024',
      '25.01.2024',
      '26.01.2024',
      '27.01.2024',
      '28.01.2024',
      '29.01.2024',
      '30.01.2024',
      '31.01.2024',
      '01.02.2024',
      '02.02.2024',
    ],
    datasets: [
      {
        type: 'bar',
        label: 'Товарный запас (шт)',
        data: [400, 450, 470, 500, 510, 520, 530, 540, 545, 550],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: '#c1c2c8',
        order: 1,
        hidden: !activeDatasets[0],
      },
      {
        type: 'line',
        label: 'Оборот (шт)',
        data: [300, 350, 370, 390, 400, 410, 420, 430, 435, 440],
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        fill: false,
        tension: 0.5,
        hidden: !activeDatasets[1],
      },
      {
        type: 'line',
        label: 'Восстановленный оборот (шт)',
        data: [3100, 3200, 3300, 3400, 3450, 3500, 3550, 3600, 3650, 3700],
        borderColor: '#19a030',
        backgroundColor: 'rgba(25, 160, 48, 0.3)',
        fill: true,
        tension: 0.5,
        hidden: !activeDatasets[2],
      },
      {
        type: 'line',
        label: 'Прогноз (шт)',
        data: [400, 420, 440, 460, 465, 480, 485, 500, 515, 530],
        borderColor: '#ffce56',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        fill: false,
        tension: 0.5,
        hidden: !activeDatasets[3],
      },
      {
        type: 'line',
        label: 'Прогноз с корректировками (шт)',
        data: [410, 430, 400, 450, 475, 490, 435, 560, 535, 580],
        borderColor: '#ffa500',
        backgroundColor: 'rgba(255, 165, 0, 0.5)',
        fill: true,
        tension: 0.5,
        hidden: !activeDatasets[4],
      },
    ] as ChartDataset<'bar' | 'line', number[]>[], // Explicitly typing the datasets
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
    },
  }

  return (
    <div className="bg-white p-8">
      {/* Buttons arranged in a grid */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {data.datasets.map(
          (dataset: ChartDataset<'bar' | 'line', number[]>, index: number) => (
            <button
              key={index}
              className={`px-1 py-1 rounded-full text-xs font-medium ${
                activeDatasets[index]
                  ? 'bg-[#93DF6F] text-black'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => toggleDataset(index)}
            >
              {dataset.label}
            </button>
          )
        )}
      </div>

      {/* Chart */}
      <div className="w-full" style={{ height: '600px' }}>
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  )
}

export default AnalyticsChart
