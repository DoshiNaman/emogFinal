import React from 'react'
import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTime }) => {

    // const expiryTime = props.expiryTime
    // const timerExpiry = tempTimer !== {} ? tempTimer : new Date()
    console.log(expiryTime);
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTime, onExpire: () => console.warn('onExpire called') });
    console.log(seconds);

    return (
        <div>{seconds}</div>
    )
}

export default Timer