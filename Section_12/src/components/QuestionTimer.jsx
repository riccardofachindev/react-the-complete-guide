import { useState, useEffect } from 'react'

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);

        return (() => {
            clearTimeout(timer);
        })
    }, [onTimeout, timeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => {
                return prevRemainingTime - 100;
            })
        }, 100);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <progress value={remainingTime} max={timeout} className={mode}></progress>
    )
}