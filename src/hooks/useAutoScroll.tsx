import { useEffect, useRef, MutableRefObject, DependencyList } from 'react'

const useAutoScroll = (
  dependencies: DependencyList
): MutableRefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [dependencies])

  return ref
}

export default useAutoScroll
