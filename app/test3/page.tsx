// @ts-nocheck
'use client';

import { useState, useRef } from "react"

function page() {
    const [counter, setCounter] = useState(0)
    const lastCall = useRef(null)

    const start = () => {
        lastCall.current = setInterval(() => {
            setCounter(prev => prev +1)
        }, 100)

    }
    const pause = () => {
        clearInterval(lastCall.current)

    }
    const reset = () => {
        clearInterval(lastCall.current)
        setCounter(0)

    }

    return (
        <div>
            <button onClick={start}>start</button>
            <button onClick={pause}>pause</button>
            <button onClick={reset}>reset</button>
            <h1>{counter}</h1>
        </div>
    )

}
export default page