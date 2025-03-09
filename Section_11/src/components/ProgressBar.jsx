import { useState, useEffect } from 'react';

const TIMER = 3000;

export default function ProgressBar() {
    const [remainingTime, setRemainingTime] = useState(3000)

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('INTERVAL');
            setRemainingTime(prevTime => prevTime - 10);
        }, 10);

        return () => {
            clearInterval(interval)
        };
    }, []);

    return (
        <progress value={remainingTime} max={TIMER}></progress>
    )
}