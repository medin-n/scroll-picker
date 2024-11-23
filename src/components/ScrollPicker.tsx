import React, { useEffect, useRef, useState } from "react"
import whiteTicksBg from "../assets/white-ticks.png"
import blackTicksBg from "../assets/black_ticks.png"
import "./ScrollPicker.less"

interface SwiperProps {
    value?: number
    width: number
    vertical?: boolean
    scrollPrecision?: number
    scrollWidth?: number
    whiteTicks?: boolean
    onChange: (value: number) => void
}

export function ScrollPicker({
    value, width, vertical,
    whiteTicks: darkTicks = false,
    scrollPrecision: precision = 1000,
    scrollWidth = 1000,
    onChange,
}: SwiperProps) {
    const ticks = darkTicks ? whiteTicksBg : blackTicksBg
    const containerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startPosition, setStartPosition] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [currentValue, setCurrentValue] = useState(0)
    const speed = 1

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true)
        setStartPosition(vertical ? e.clientY : e.clientX)
        setScrollLeft(containerRef?.current?.scrollLeft ?? 0)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()

        const walk = vertical
            ? (e.clientY - startPosition) * speed * -1
            : (e.clientX - startPosition) * speed

        if (containerRef?.current) {
            containerRef.current.scrollLeft = (scrollLeft - walk)

            const newValue = Math.round(((containerRef.current.scrollLeft)
                / (containerRef.current.scrollWidth - width)) * precision) / precision

            setCurrentValue(newValue)
            onChange(newValue)
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)

        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("mouseup", handleMouseUp)
        }
    }, [isDragging])

    useEffect(() => {
        const newValue = Math.round((value ?? 0) * precision) / precision
        if (containerRef.current && (newValue !== currentValue)) {
            console.log('Reseting new value')
            let position = 0

            if (newValue !== undefined) {
                position = newValue * (containerRef.current.scrollWidth - (width))
            } else {
                const middlePosition = (containerRef.current.scrollWidth / 2)
                    - (containerRef.current.offsetWidth / 2)
                position = middlePosition
            }
            containerRef.current.scrollLeft = position
        }
    }, [value, currentValue])

    return (
        <div className={`ScrollPicker ${vertical ? "vertical" : ""}`} style={{ width }}>
            <div
                className="scroll-picker-container"
                ref={containerRef}
                style={{ width, padding: `0 ${width / 2}px` }}
            >
                <div
                    className={`dragger ${isDragging ? "dragging" : ""}`}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    style={{
                        backgroundImage: `url(${ticks})`,
                        width: scrollWidth
                    }}
                />
            </div>
        </div>
    )
}
