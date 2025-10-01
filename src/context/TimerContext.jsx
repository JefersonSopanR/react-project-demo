import { useState, useEffect, useRef, createContext } from "react";

export const TimerContext = createContext();

export function TimerContextProvider({children}) {

	//Timer
	const [button, setButton] = useState(false);
	const [start, setStart] = useState(false);
	const [time, setTime] = useState('0');
	const [logs, setLogs] = useState([]);
	const [symbol, setSymbol] = useState(true)
	const interval = useRef();
	let timeRef = useRef(0);
	let seconds = useRef(0);
	let minutes = useRef(0);

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
				setTime(`${minutes.current}:0${seconds.current%60}.${rawTime%10}`);
			else
				setTime(`${minutes.current}:${seconds.current%60}.${rawTime%10}`);
		}
		else if (seconds.current > 0) {
			setTime(`${seconds.current%60}.${rawTime%10}`)
		}
		else 
			setTime(`0.0${rawTime}`)
		
	}

	return (
		<TimerContext.Provider value={{button, setButton, start, setStart, time, setTime, 
								interval, timeRef, seconds, minutes, logs, setLogs, symbol, setSymbol}}>
			{children}
		</TimerContext.Provider>
	)
}
