import {createContext, useState} from 'react'

export const WordleContext = createContext();

export function WordleContextProvider({children}) {
	const [guesses, setGuesses] = useState([]);
	const [currentGuess, setCurrentGuess] = useState('');
	const [answer, setAnswer] = useState('');
	const [win, setWin] = useState(false);
	const [lose, setLose] = useState(false);

	return (
		<WordleContext.Provider value={{guesses, setGuesses, currentGuess, setCurrentGuess, 
								answer, setAnswer, win, setWin, lose, setLose}}>
			{children}
		</WordleContext.Provider>
	)
}

