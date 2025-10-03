import { AuthContext } from "../context/AuthContext"
import { useContext, useState, useEffect, useRef } from "react"

const WORDS = ["BUENO", "PILAR", "POCOS"];

const Game = ({currentGuess, setCurrentGuess, focusedCell, setFocusedCell}) => {

	const emptyRow = Array(5).fill({letter: '', color: ''});
	const rows = [];

	// Add current guess row
	if (rows.length < 6) {
		const guessWord = currentGuess.padEnd(5).split('').map(letter => ({letter: letter.trim(), color: ''}))
		rows.push(guessWord);
	}

	// Fill remaining rows
	while (rows.length < 6)
		rows.push(emptyRow)

	const handleCellFocus = (cellIndex) => {
		// Only allow focusing on current guess row (first row)
		const rowIndex = Math.floor(cellIndex / 5);
		if (rowIndex === 0) {  // Only current guess row is focusable
			setFocusedCell(cellIndex);
		}
	};

	return (
		<div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 60px)', gap: '5px',justifyContent: 'center'}}>
			{
				rows.flat().map((row, index) => (
					<div 
						key={index} 
						tabIndex={Math.floor(index / 5) === 0 ? 0 : -1}  // Only current row is focusable
						onClick={() => handleCellFocus(index)}
						style={{
							width: '60px', 
							height: '60px', 
							border: focusedCell === index ? '2px solid blue' : '2px solid #ccc', 
							backgroundColor: focusedCell === index ? '#e3f2fd' : 'white',
							justifyContent: 'center', 
							display: 'flex', 
							alignItems: 'center',
							outline: 'none',
							cursor: Math.floor(index / 5) === 0 ? 'pointer' : 'default'
						}}
						onFocus={() => handleCellFocus(index)}
					>
						{row.letter}
					</div>
				))
			}
		</div>
	)
}

const Wordle = () => {

	const [currentGuess, setCurrentGuess] = useState('');
	const [focusedCell, setFocusedCell] = useState(null);

	useEffect(() => {

		function handleKey(e) {
			const key = e.key.toUpperCase();
			
			if (key.length === 1 && /[A-Z]/.test(key)) {
				if (focusedCell !== null) {
					// Focused cell input - update specific position
					const cellPosition = focusedCell % 5;  // Get column (0-4)
					const newGuess = currentGuess.padEnd(5).split('');
					newGuess[cellPosition] = key;
					let joinGuess = '';

					for (let i = 0; i < newGuess.length; i++) {
						if (newGuess[i] != ' ') joinGuess += newGuess[i];
						else joinGuess += ' '
					}
					setCurrentGuess(joinGuess);
					// Move to next cell if not at end
					if (cellPosition < 4) {
						setFocusedCell(focusedCell + 1);
					}
				} else {
					console.log("Else")
					// Normal sequential input
					if (currentGuess.length < 5) {
						setCurrentGuess(currentGuess + key);
					}
				}
			}
			else if (e.key === 'Backspace') {
				if (focusedCell !== null) {
					// Focused cell backspace - clear specific position
					const cellPosition = focusedCell % 5;
					const newGuess = currentGuess.padEnd(5).split('');
					newGuess[cellPosition] = '';
					let joinGuess = '';
					for (let i = 0; i < newGuess.length; i++) {
						if (newGuess[i] != '') joinGuess += newGuess[i];
						else joinGuess += ' ';
					}

					setCurrentGuess(joinGuess);
					
					// Move to previous cell if not at start
					if (cellPosition > 0) {
						setFocusedCell(focusedCell - 1);
					}
				} else {
					// Normal backspace
					if (currentGuess.length > 0)
						setCurrentGuess(currentGuess.slice(0, -1));
				}
			}
			else if (e.key === 'Escape') {
				// Clear focus to return to normal input mode
				setFocusedCell(null);
			}
		}

		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, [currentGuess, focusedCell]);

	return (
		<div>
			<Game 
				currentGuess={currentGuess} 
				setCurrentGuess={setCurrentGuess}
				focusedCell={focusedCell}
				setFocusedCell={setFocusedCell}
			/>
			<p>Mode: {focusedCell !== null ? `Focused on cell ${focusedCell % 5 + 1}` : 'Sequential typing'}</p>
			<p>Press Escape to exit focused mode</p>
		</div>
	)
}

export default Wordle
