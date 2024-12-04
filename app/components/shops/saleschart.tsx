'use client'

import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const SalesChart: React.FC = () => {
  const [activeDatasets, setActiveDatasets] = useState([true, true]) // Manage visibility of datasets

  const toggleDataset = (index: number) => {
    setActiveDatasets((prev) =>
      prev.map((active, i) => (i === index ? !active : active))
    )
  }

  const chartData = {
    labels: [
      '01.02.2024',
      '02.02.2024',
      '03.02.2024',
      '04.02.2024',
      '05.02.2024',
      '06.02.2024',
      '07.02.2024',
    ],
    datasets: [
      {
        label: 'наценка / прибыль (руб)',
        data: [150000, 120000, 130000, 180000, 140000, 160000, 140000],
        borderColor: '#3b82f6',
        backgroundColor: '#93c5fd',
        tension: 0.4,
        hidden: !activeDatasets[0], // Control visibility via state
      },
      {
        label: 'оборот (руб)',
        data: [200000, 250000, 280000, 300000, 260000, 350000, 320000],
        borderColor: '#f97316',
        backgroundColor: '#fdba74',
        tension: 0.4,
        hidden: !activeDatasets[1], // Control visibility via state
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
      title: {
        display: true,
        text: 'Оборот и прибыль по дням',
        font: {
          size: 10,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 8,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
          },
          callback: function (tickValue: string | number) {
            const value =
              typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue
            return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
          },
        },
      },
    },
  }

  return (
    <div className="mx-auto bg-white text-xs">
      <div className="overflow-x-auto">
        <div className="flex justify-end space-x-2 mb-2">
          {/* Custom legend buttons */}
          <button
            className={`px-2 py-1 rounded-t-lg shadow-md ${
              activeDatasets[0]
                ? 'bg-[#93DF6F] text-black'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => toggleDataset(0)}
          >
            прибыль (руб)
          </button>
          <button
            className={`px-2 py-1 rounded-t-lg shadow-md ${
              activeDatasets[1]
                ? 'bg-[#93DF6F] text-black'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => toggleDataset(1)}
          >
            оборот (руб)
          </button>
        </div>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default SalesChart
