import { useState, useRef, useEffect, useContext } from "react";
import { TimerContext } from "../context/TimerContext";
import { AuthContext } from "../context/AuthContext";

const SortLogs = ({logs, setLogs}) => {

	const {symbol, setSymbol} = useContext(TimerContext);
	const [switcher, setSwitcher] = useState(true);
	const {len, language} = useContext(AuthContext)

	const Parser = (str) => {
		let minutes = 0;
		let seconds = 0;
		let miliseconds = 0;
		if (str.includes(':')) {
			const [min, rest] = str.split(':');
			minutes = Number(min);
			[seconds, miliseconds] = rest.split('.').map(Number);
		}
		else {
			[seconds, miliseconds] = str.split('.').map(Number);
		}
		return ((minutes * 60) + (seconds) + (miliseconds / 100))
	}

	for (let i = 0; i < logs.length; i++) {
		for (let j = i + 1; j < logs.length; j++) {
			if (symbol === true) {
				if (Parser(logs[i].time) < Parser(logs[j].time)) {
					let temp = logs[i];
					logs[i] = logs[j];
					logs[j] = temp;
					i = 0;
				}
			} else {
				if (Parser(logs[i].time) > Parser(logs[j].time)) {
					let temp = logs[i];
					logs[i] = logs[j];
					logs[j] = temp;
					i = 0;
				}
			}
		}
	}

	const updateTheme = (value, index) => {
		setLogs(logs.map(log => {
			if (log.id === index) {
				return ({...log, theme: value, showLogTheme: true});
			}
			return log
		}))
	}

	const eraseLog = (index) => {
		setLogs(logs.filter((logs) => logs.id !== index));
	}

		return (
			<>
				<button onClick={() => setSymbol(!symbol)}> {symbol ? len[language].ToptoBottonTimer : len[language].BottontoTopTimer}</button>
				{ logs.length > 0 ?
					logs.map((log, index) => (
						<div key={log.id}>
							<p>{index + 1} { log.showLogTheme === false ? (
								<input defaultValue={log.theme} placeholder={len[language].placeHolderAddThemeTimer} onBlur={(e) => {
									const value = e.target.value;
									if (value.trim()) {
										updateTheme(value, log.id)
									}
								}}></input>)
								: <button onClick={() => {log.showLogTheme = false, setSwitcher(!switcher)}}>{log.theme}</button>
							} - {log.time} <button onClick={() => eraseLog(log.id)}>🗑️</button></p>
						</div>
					)) : <p>No logs yet!</p>
				}

			</>
		)
	}

const Timer = () => {
	const {button, setButton, start, setStart, time, setTime, timeRef, seconds, minutes, logs, setLogs} = useContext(TimerContext);
	const {len, language} = useContext(AuthContext)

	const clearTime = () => {
		const finalTime = time;
		if (Number(finalTime) === 0)
			return ;
		setButton(false)
		setStart(false);
		setTime('0');
		timeRef.current = 0;
		seconds.current = 0;
		minutes.current = 0;
		setLogs((logs) => [...logs, {id: Date.now(), time: finalTime, theme: '', showLogTheme: false}])
	}

	return (
		<div>
			<p>{len[language].welcomeTimer}</p>
			{start ? ( <>
				<button onClick={() => setButton(!button)}>{button ? len[language].stopTimer : len[language].continueTimer}</button>
				<button onClick={() => clearTime()} >{len[language].clearTimer}</button> </> )
				: 
				<button onClick={() => {setStart(!start), setButton(true)}}>{len[language].startTimer}</button>
			 }
			<p>{time}</p>
			<div>
			 	{
					logs.length > 0 && (<><button onClick={() => setLogs([])}>{len[language].clearLogsTimer}</button> <SortLogs logs={logs} setLogs={setLogs}/></>)
				}
			</div>
		</div>
	)
}

export default Timer
