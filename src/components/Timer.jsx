import { useState, useEffect } from 'react';

export const Timer = () => {
  const [state, setState] = useState("")
  const [resumeTo, setResumeTo] = useState("")
  
  const [timeLeft, setTimeLeft] = useState(null)

  const work = () => {
    setState("work")
    setTimeLeft(5 * 1000)
  }

  const breakTime = () => {
    setState("break")
    setTimeLeft(3 * 1000)
  }

  const pause = () => {
    setResumeTo(state)
    setState("pause")
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (state !== "pause" && state !== "") {
        setTimeLeft((_timespan) => _timespan - 1_000);
      }
    }, 1_000);
      
    return () => {
      clearInterval(intervalId);
    };
  });

  if (state === "work" && timeLeft / 1000 === 0) {
    setState("break")
    setTimeLeft(3 * 1000)
    breakTime()
  }
  if (state === "break" && timeLeft / 1000 === 0) {
    work()
  }

  const formatTimer = (timeToFormat) => {
    const mins = Math.floor(timeToFormat / 60 / 1000)
    const secs = (timeToFormat / 1000) - Math.floor(timeToFormat / 60 / 1000)*60

    return <span>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
  }

  if (state === "") {
    return <button onClick={work} >Start pomodoro</button>
  }

  return (
    <div className="timer">
      { state !== "pause" && <button onClick={pause}>Pause</button>}
    
      {
        state === "pause"
        ? <>
          <button onClick={() => setState(resumeTo)}>Resume the {resumeTo}</button>
          <div>Time left in {resumeTo}: {formatTimer(timeLeft)} </div>
        </>
        : <div>{state === "work" ? "Break" : "Work"} in {formatTimer(timeLeft)} </div>
      }
    </div>
  );
};