'use client'

import { useEffect, useRef } from 'react'
import { useAssetStore } from '@/store/useAssetStore'

export const IntervalProvider = ({ children }: { children: React.ReactNode }) => {
    const updateSensors = useAssetStore((state) => state.updateSensors)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        updateSensors() // Initial update
        intervalRef.current = setInterval(() => {
            updateSensors()
        }, 3000)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [updateSensors])

    return <>{children}</>
}
