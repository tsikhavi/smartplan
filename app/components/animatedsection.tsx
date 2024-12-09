import { useState, useEffect, useRef } from 'react'

function useInView(threshold = 0.5) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { ref, isVisible } = useInView()

  return (
    <div
      ref={ref}
      className={`transition-all transform-gpu duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  )
}
export default AnimatedSection
