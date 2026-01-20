"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SlideButtonProps {
    onComplete?: () => void
    text?: string
    className?: string
    isCompleted?: boolean
}

export function SlideButton({ onComplete, text = "Slide to Confirm", className, isCompleted: initialCompleted = false }: SlideButtonProps) {
    const [isCompleted, setIsCompleted] = React.useState(initialCompleted)
    const controls = useAnimation()
    const x = useMotionValue(0)
    const bgOpacity = useTransform(x, [0, 200], [0.5, 1])

    // Constraints
    const constraintsRef = React.useRef<HTMLDivElement>(null)

    const handleDragEnd = async () => {
        const currentX = x.get()
        if (currentX > 200) { // Threshold
            setIsCompleted(true)
            if (onComplete) onComplete()
        } else {
            controls.start({ x: 0 })
        }
    }

    return (
        <div
            ref={constraintsRef}
            className={cn(
                "relative h-14 w-full rounded-full bg-muted overflow-hidden flex items-center p-1",
                isCompleted ? "bg-primary" : "bg-neutral-200 dark:bg-neutral-800",
                className
            )}
        >
            {/* Background Fill Animation */}
            <motion.div
                className="absolute inset-0 bg-primary/20"
                style={{ opacity: bgOpacity }}
            />

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className={cn("font-semibold text-sm uppercase tracking-wider transition-colors", isCompleted ? "text-primary-foreground" : "text-muted-foreground")}>
                    {isCompleted ? "Completed" : text}
                </span>
            </div>

            {/* Slider Thumb */}
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 230 }} // Adjust based on width
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                animate={controls}
                style={{ x }}
                className="relative z-10 h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing"
                whileTap={{ scale: 1.05 }}
            >
                {isCompleted ? (
                    <div className="h-4 w-4 bg-primary rounded-full" />
                ) : (
                    <ChevronRight className="h-6 w-6 text-primary" />
                )}
            </motion.div>
        </div>
    )
}
