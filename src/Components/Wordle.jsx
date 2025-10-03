import { AuthContext } from "../context/AuthContext"
import { useContext, useState, useEffect, useRef } from "react"

const WORDS = ["BUENO", "PILAR", "POCOS"];

const Game = ({focusCell, setFousCell, currentGuess, guesses}) => {

	const emptyRows = Array(5).fill({letter: '', color: ''});
	const rows = guesses.slice();

	if (rows.length < 6) {
		const wordGuess = currentGuess.padEnd(5).split('').map(letter => ({letter: letter, color: ''}));
		rows.push(wordGuess);
	}

	while (rows.length < 6)
		rows.push(emptyRows)

	const handleFocus = (index) => {
		const row = Math.floor(focusCell/5);
		const bottom = row * 5;
		const top = (row * 5) + 5;
		if (index < bottom || index > top)
		{
			console.log("returning from if handle FOCUS")
			return;
		}
		setFousCell(index);
	}

	return (
		<div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 60px)', gap: '5px',justifyContent: 'center'}}>
		{
			rows.flat().map((row, index) => (
			<div key={index} onClick={() => handleFocus(index)} onFocus={() => handleFocus(index)}
			style={{width: '60px', height: '60px', border: focusCell === index ? '2px solid #E3E0FF' : '2px #ccc' ,background: '#EEF2F2'}}>
			{row.letter}</div>))
		}
		</div>
	)
}

const Wordle = () => {
	const [focusCell, setFousCell] = useState(null);
	const [currentGuess, setCurrentGuess] = useState('');
	const [guesses, setGuesses] = useState([])

	useEffect(() => {
	function handleKey(e) {
		const key = e.key.toUpperCase();
		if ((key.length === 1 && /[A-Z]/.test(key))) {
			if (focusCell !== null) {
				const index = focusCell % 5;
				const splitGuess = currentGuess.padEnd(5).split('');
				splitGuess[index] = key;
				let joinGuess = '';
				for (let i = 0; i < splitGuess.length; i++) {
					if (splitGuess[i] !== ' ') joinGuess += splitGuess[i];
					else joinGuess += ' ';
				}
				setCurrentGuess(joinGuess);
				const focusPosLim = (Math.floor(focusCell/5) * 5) + 4
				if (focusCell < focusPosLim) {
					setFousCell(focusCell + 1);
				}
			}
			else {
				if (currentGuess.length < 5) {
					setCurrentGuess(currentGuess + key);
				}
			}
		} else if (e.key === 'Backspace' && currentGuess.length > 0) {
			if (focusCell !== null) {
				const index = focusCell % 5;
				const splitGuess = currentGuess.padEnd(5).split('');
				splitGuess[index] = ' '
				let joinGuess = '';
				for (let i = 0; i < splitGuess.length; i++) {
					if (splitGuess[i] !== ' ') joinGuess += splitGuess[i];
					else joinGuess += ' '
				}
				setCurrentGuess(joinGuess);
				const focusBottom = (Math.floor(focusCell/5) * 5);
				const focusTop = (Math.floor(focusCell/5) * 5) + 5;
				console.log("focusBottom -> ", focusBottom);
				console.log("focusTop -> ", focusTop)
				if (focusCell > focusBottom && focusCell < focusTop) {
					setFousCell(focusCell - 1);
				}
			} else {
				setCurrentGuess(currentGuess.slice(0, -1));
			}
		} else if (e.key === 'Enter' && currentGuess.length === 5 && guesses.length < 6) {
			if (currentGuess.includes(' ')) return;
			const convertGuesse = convertGuess(currentGuess);
			setGuesses([...guesses, convertGuesse]);
			setCurrentGuess('');
			setFousCell(focusCell => ((Math.floor(focusCell/5) + 1) * 5))
		}
	}

	window.addEventListener('keydown', handleKey)
	return () => window.removeEventListener('keydown', handleKey) 
	}, [currentGuess, focusCell]) 

	const convertGuess = (currentGuess) => {
		const splitGuess = currentGuess.split('');
		const result = [];

		for (let i = 0; i < splitGuess.length; i++) {
			result[i] = {letter: splitGuess[i], color: ''}
		}
		return result
	}

	return (
		<div style={{padding: '10px'}}>
			<Game focusCell={focusCell} setFousCell={setFousCell} currentGuess={currentGuess} guesses={guesses}/>
		</div>
	)
}

export default Wordle
