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
      <button
        onClick={() => setSymbol(!symbol)}
        className="mb-4 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg shadow-sm transition">
        {symbol ? len[language].ToptoBottonTimer : len[language].BottontoTopTimer}
      </button>

      {logs.length > 0 ? (
        <div className="space-y-3">
          {logs.map((log, index) => (
            <div
              key={log.id}
              className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
              <p className="text-slate-700 text-sm flex-1">
                {index + 1}.{" "}
                {log.showLogTheme === false ? (
                  <input
                    defaultValue={log.theme}
                    placeholder={len[language].placeHolderAddThemeTimer}
                    className="px-2 py-1 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value.trim()) {
                        updateTheme(value, log.id);
                      }
                    }}
                  ></input>
                ) : (
                  <button
                    onClick={() => {
                      log.showLogTheme = false;
                      setSwitcher(!switcher);
                    }}
                    className="text-indigo-600 font-medium hover:underline">
                    {log.theme}
                  </button>
                )}{" "}
                - <span className="font-mono">{log.time}</span>
              </p>
              <button
                onClick={() => eraseLog(log.id)}
                className="ml-2 text-red-500 hover:text-red-700 transition">
                🗑️
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 italic">No logs yet!</p>
      )}
    </>
  );
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
    <div className="flex justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 text-center">
        <p className="text-lg font-medium text-slate-600 mb-4">
          {len[language].welcomeTimer}
        </p>

        {/* Timer display */}
        <p className="text-5xl font-bold text-slate-800 mb-6 font-mono">
          {time}
        </p>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {start ? (
            <>
              <button
                onClick={() => setButton(!button)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm font-medium transition">
                {button
                  ? len[language].stopTimer
                  : len[language].continueTimer}
              </button>
              <button
                onClick={() => clearTime()}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-slate-700 rounded-lg shadow-sm font-medium transition">
                {len[language].clearTimer}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setStart(!start), setButton(true);
              }}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm font-medium transition"
            >
              {len[language].startTimer}
            </button>
          )}
        </div>

        {/* Logs */}
        {logs.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-3">
              <button
                onClick={() => setLogs([])}
                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md shadow-sm transition">
                {len[language].clearLogsTimer}
              </button>
            </div>
            <SortLogs logs={logs} setLogs={setLogs} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Timer
