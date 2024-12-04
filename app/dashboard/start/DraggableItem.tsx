import { useDraggable } from '@dnd-kit/core'
import { StatItem } from './storeData'
import React from 'react'

const DraggableItem: React.FC<{
  stat: StatItem
  children: React.ReactNode
}> = ({ stat, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: stat.id,
    data: { statItem: JSON.stringify(stat) },
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="z-20 relative"
    >
      {children}
    </div>
  )
}

export default DraggableItem
