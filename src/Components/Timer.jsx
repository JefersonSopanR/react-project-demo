import { useState, useRef, useEffect, useContext } from "react";
import { TimerContext } from "../context/TimerContext";

const Timer = () => {
	const {button, setButton, start, setStart, time, setTime, interval, timeRef, seconds, minutes} = useContext(TimerContext);
	const [logs, setLogs] = useState([]);

	const clearTime = () => {
		const finalTime = time;
		setButton(false)
		setStart(true);
		setTime('0');
		timeRef.current = 0;
		seconds.current = 0;
		minutes.current = 0;
		setLogs((logs) => [...logs, {id: Date.now(), time: finalTime}])
	}

	const sortLogs = () => {
		for (let i in logs) {
			let temp = {};

			
		}
	}

	return (
		<div>
			<p>This is the timer</p>
			{start ? ( <>
				<button onClick={() => setButton(!button)}>{button ? "Stop" : "Continue"}</button>
				<button onClick={() => clearTime()} >Clear</button> </> )
				: 
				<button onClick={() => {setStart(!start), setButton(true)}}>Start</button>
			 }
			<p>the time is: {time}</p>
			<div>
			 	{
					logs.length > 0 && sortLogs();
				}
			</div>
		</div>
	)
}

export default Timer
