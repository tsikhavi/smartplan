'use client'
import BarChart from '@app/app/components/barchart'
import { v4 as uuidv4 } from 'uuid'
import {
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  useDroppable,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import DraggableItem from './DraggableItem'
import { SortableItem } from './SortableItem'
import { StatItem } from './storeData'
import { useEffect, useState } from 'react'
import AnimatedSection from '@app/app/components/animatedsection'

import { CONTENT_STAT_ITEMS } from './storeData'
import React from 'react'
import { TableAnalytics, TableGroup } from './Content'
import dynamic from 'next/dynamic'
const DateDisplay = dynamic(() => import('./datedisplay'), { ssr: false })

interface MainContentProps {
  stats: StatItem[]
}

function DroppableWrapper({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <div ref={setNodeRef} id={id} className="droppable">
      {children}
    </div>
  )
}

export default function MainContent({ stats }: MainContentProps) {
  const [items, setItems] = useState([...stats, ...CONTENT_STAT_ITEMS])
  const [filteredItems, setFilteredItems] = useState(items) // Filtered list
  const [labels, setLabels] = useState<string[]>([])

  const [charts, setCharts] = useState([
    {
      id: uuidv4(),
      title: 'Кол-во чеков',
      dataPoints: [129.0, 138.0, 127.0, 122.5, 118.5, 120.0],
      barColor: 'rgba(234, 179, 8, 0.8)',
    },
    {
      id: uuidv4(),
      title: 'Оборот (руб)',
      dataPoints: [420, 550, 330, 270, 305, 290],
      barColor: 'rgba(59, 130, 246, 0.8)',
    },
    {
      id: uuidv4(),
      title: 'Прибыль (руб)',
      dataPoints: [22500, 34500, 17000, 15000, 17000, 18500],
      barColor: 'rgba(34, 197, 94, 0.8)',
    },
    {
      id: uuidv4(),
      title: 'Сред чек (руб)',
      dataPoints: [50000, 70000, 40000, 35000, 37500, 32500],
      barColor: 'rgba(249, 115, 22, 0.8)',
    },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const formatNumber = (num: number) =>
    new Intl.NumberFormat('ru-RU').format(num)

  const generateRandomPoints = (baseValue: number, count: number) =>
    Array.from({ length: count }, () =>
      Math.round(baseValue * (0.8 + Math.random() * 0.4))
    )

  const generateDateRange = (start: string, end: string): string[] => {
    const startDate = new Date(start.split('.').reverse().join('-'))
    const endDate = new Date(end.split('.').reverse().join('-'))
    const dates: string[] = []

    while (startDate <= endDate) {
      const day = startDate.getDate().toString().padStart(2, '0')
      const month = (startDate.getMonth() + 1).toString().padStart(2, '0')
      const year = startDate.getFullYear()
      dates.push(`${day}.${month}.${year}`)
      startDate.setDate(startDate.getDate() + 1)
    }

    return dates
  }

  const fetchDateRange = () => {
    const storedLastDate = localStorage.getItem('selectedLastDate')
    const storedFirstDate = localStorage.getItem('selectedFirstDate')
    if (storedLastDate && storedFirstDate) {
      const range = generateDateRange(storedFirstDate, storedLastDate)
      setLabels(range)
    }
  }

  useEffect(() => {
    fetchDateRange()
  }, [])

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (!active || !over) {
      console.warn('Drag end event missing active or over elements')
      return
    }

    const draggedItem = items.find((item) => item.id === active.id)
    const droppedChart = charts.find((chart) => chart.id === over.id)

    if (droppedChart && draggedItem) {
      setCharts((currentCharts) => {
        const updatedCharts = currentCharts.map((chart) =>
          chart.id === droppedChart.id
            ? {
                ...chart,
                title: draggedItem.description,
                dataPoints: generateRandomPoints(
                  draggedItem.value,
                  labels.length
                ),
              }
            : chart
        )

        return updatedCharts
      })
    } else if (active.id !== over.id) {
      setItems((currentItems: any[]) => {
        const oldIndex = currentItems.findIndex(
          (item: { id: any }) => item.id === active.id
        )
        const newIndex = currentItems.findIndex(
          (item: { id: any }) => item.id === over.id
        )

        const reorderedItems = arrayMove(currentItems, oldIndex, newIndex)

        return reorderedItems
      })
    }
  }

  const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'Средний') {
      setFilteredItems(
        items.filter((item) => item.description.includes('средн'))
      )
    } else {
      setFilteredItems(items)
    }
  }

  const first12Items = filteredItems.slice(0, 12)
  const remainingItems = filteredItems.slice(12)

  return (
    <section className="col-span-4 pl-1 pb-4">
      <AnimatedSection>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {/* Filter Select */}
          <div className="mb-4">
            <select onChange={onFilterChange} className="border p-2 rounded">
              <option value="Общие">Общие</option>
              <option value="Средний">Средний</option>
            </select>
          </div>

          {/* Draggable List for First 12 Items */}
          <SortableContext
            items={first12Items.map((item: { id: any }) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-6 gap-2 mt-1 ml-2 relative z-10">
              {first12Items.map((stat: StatItem) => (
                <SortableItem key={stat.id} id={stat.id}>
                  <DraggableItem stat={stat}>
                    <div className="h-16 w-32 m-1 bg-[#D9D9D9] hover:w-32 hover:bg-[#D9D9D9]/80 hover:ring-2 hover:ring-malachite-500 hover:translate-y-1 hover:translate-x-1 hover:shadow-md hover:cursor-pointer rounded-lg text-xs text-center flex flex-col justify-center">
                      <p className="text-sm font-bold pb-1">
                        {formatNumber(stat.value)}
                      </p>
                      <p className="text-xs px-2 text-wrap first-letter:uppercase">
                        {stat.description.length > 30
                          ? `${stat.description.substring(0, 30)}...`
                          : stat.description}
                      </p>
                    </div>
                  </DraggableItem>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
          {/* Draggable List for Remaining Items */}

          <DateDisplay />

          <section className="grid grid-cols-4 gap-4 ml-0 mt-0 w-full">
            <div className="col-span-2 mt-2 ml-2">
              <SortableContext
                items={remainingItems.map((item: { id: any }) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-wrap gap-2">
                  {' '}
                  {/* Using flex and wrap for horizontal layout */}
                  {remainingItems.map((stat: StatItem) => (
                    <SortableItem key={stat.id} id={stat.id}>
                      <DraggableItem stat={stat}>
                        <div className="h-16 w-32 m-1 bg-[#D9D9D9] hover:w-32 hover:bg-[#D9D9D9]/80 hover:ring-2 hover:ring-malachite-500 hover:translate-y-1 hover:translate-x-1 hover:shadow-md hover:cursor-pointer rounded-lg text-xs text-center flex flex-col justify-center">
                          <p className="text-sm font-bold pb-1">
                            {formatNumber(stat.value)}
                          </p>
                          <p className="text-xs px-2 text-wrap first-letter:uppercase">
                            {stat.description.length > 30
                              ? `${stat.description.substring(0, 30)}...`
                              : stat.description}
                          </p>
                        </div>
                      </DraggableItem>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </div>

            <div className="col-span-2 mt-0 mx-8">
              <TableGroup />
              <TableAnalytics />
            </div>
          </section>

          {/* Bar Chart Section */}
          <section className="grid grid-cols-4 gap-4 mt-2 relative z-0">
            {charts.map((chart) => (
              <DroppableWrapper key={chart.id} id={chart.id}>
                <div className="relative bg-white rounded-lg first-letter:uppercase shadow-md p-2 hover:ring-4 hover:ring-malachite-300 transition">
                  <BarChart
                    labels={labels}
                    dataPoints={chart.dataPoints}
                    barColor={chart.barColor}
                    title={chart.title}
                  />
                </div>
              </DroppableWrapper>
            ))}
          </section>
        </DndContext>
      </AnimatedSection>
    </section>
  )
}
