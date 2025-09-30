import { useState, useRef, useEffect } from "react";

const Timer = () => {
	const [button, setButton] = useState(false);
	const [start, setStart] = useState(false);
	const [time, setTime] = useState('0');
	const interval = useRef();
	let timeRef = useRef(0);
	let seconds = useRef(0);
	let minutes = useRef(0);


	const getTime = (rawTime) => {
		if (rawTime >= 10) {
			timeRef.current = 0;
			seconds.current = seconds.current + 1;
		}
		if (seconds.current >= 60) {
			minutes.current = minutes.current + 1;
			seconds.current = 0;
		}
		if (minutes.current > 0) {
			if (seconds.current < 10)
				setTime(`${minutes.current}, 0${seconds.current%60}.${rawTime%10}`);
			else
				setTime(`${minutes.current}, ${seconds.current%60}.${rawTime%10}`);
		}
		else if (seconds.current > 0) {
			setTime(`${seconds.current%60}.${rawTime%10}`);
		}
		else
			setTime(`${rawTime}`)
		
	}

	useEffect(() => {

		if (button) {
			interval.current = setInterval(() => {
				timeRef.current = timeRef.current + 1; 
				getTime(timeRef.current);
			}, 100)
		}

		return () => {
			if (interval.current) {
				clearInterval(interval.current);
			}
		}

	}, [button])

	const clearTime = () => {
		setButton(false)
		setStart(true);
		setTime('0');
		timeRef.current = 0;
		seconds.current = 0;
		minutes.current = 0;
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
		</div>
	)
}

export default Timer
