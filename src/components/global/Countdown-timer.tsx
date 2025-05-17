"use client"

import { MdOutlineNotificationsActive } from "react-icons/md";
import { useState, useEffect } from "react"

export function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 5,
        hours: 5,
        minutes: 36,
        seconds: 12,
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((current) => {
                let { days, hours, minutes, seconds } = current

                if (seconds > 0) {
                    seconds--
                } else {
                    seconds = 59
                    if (minutes > 0) {
                        minutes--
                    } else {
                        minutes = 59
                        if (hours > 0) {
                            hours--
                        } else {
                            hours = 23
                            if (days > 0) {
                                days--
                            }
                        }
                    }
                }

                return { days, hours, minutes, seconds }
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="rounded-lg bg-specialBackgroundColor px-2 py-1">
            <div className="mb-2 flex items-center gap-2 text-sm">
                <MdOutlineNotificationsActive className="h-4 w-4" />
                <span>Discount ends in:</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit}>
                        <div className="font-bold text-[#ff782d]">{value}</div>
                        <div className="text-xs text-muted-foreground">{unit}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

