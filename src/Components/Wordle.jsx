import { AuthContext } from "../context/AuthContext"
import { useContext, useState, useEffect, useRef } from "react"

const WORDS = ["BUENO", "PILAR", "POCOS"];

const Game = ({currentGuess, arrayGues}) =>
{
	const emptyRows = Array(5).fill({letter: '', color: ''});
	const rows = arrayGues.slice();

	if (rows.length < 6) {
		const currentGuessTemp = currentGuess.padEnd(5).split('').map(l => ({letter: l, color: ''}));
		rows.push(currentGuessTemp);
	}

	while (rows.length < 6) {
		rows.push(emptyRows);
	}

	return (

			<div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 60px)', gap: '5px', justifyContent: "center"}}>
				{
					rows.flat().map((row, index) => (
					<div 
						key={index} 
						tabIndex={0}  // Makes the cell focusable
						onClick={(e) => e.target.focus()}  // Focus when clicked
						style={{
							width: '60px', 
							height: '60px',
							backgroundColor: row.color === 'green' ? 'green' : row.color === 'yellow' ? 'yellow' : 'gray',
							color: row.color ? 'black' : 'white',
							outline: 'none',  // Remove default focus outline
							border: '2px solid transparent',  // Add custom focus style
						}}
						onFocus={(e) => e.target.style.border = '2px solid blue'}  // Custom focus style
						onBlur={(e) => e.target.style.border = '2px solid transparent'}  // Remove focus style
					>
						{row.letter}
					</div>
				))
				}
			</div>
	)
}

const Keys = () => {

}

const Wordle = () => {

	const [answer, setAnswer] = useState('');
	const [currentGuess, setCurrentGuess] = useState('');
	const [arrayGues, setArrayGuess] = useState([]);
	const [win, setWin] = useState(false);
	const [lose, setLose] = useState(false);

	useEffect(() => {
		const word = WORDS[Math.floor(Math.random() * WORDS.length)]
		setAnswer(word);
		console.log("Answer: ", answer);
	}, [])

	useEffect(() => {

		if (win || lose) {
			return ;
		}
		const handleKeyPress = (e) => {
			const key = e.key.toUpperCase();
			if (key.length === 1 && /[A-Z]/.test(key) && currentGuess.length < 5) {
				setCurrentGuess(currentGuess + key);
			}
			else if (key === 'ENTER' && arrayGues.length <= 5 && currentGuess.length === 5) {
				const tempGuess = currentGuess;
				setArrayGuess([...arrayGues, treatGuess(tempGuess)]);
				setCurrentGuess('');
				if (tempGuess === answer) setWin(true);
				else if (arrayGues.length === 5) setLose(true);
			}
			else if (e.key === 'Backspace' && currentGuess.length > 0) {
				setCurrentGuess(currentGuess.slice(0, -1));
			}
		}

		window.addEventListener('keydown', handleKeyPress)
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [currentGuess])

	const treatGuess = (guessWord) => {
		console.log("TREAT GUESSING")
		const result = ([]);
		const answerSplit = answer.split('');
		const guessWordSplit = guessWord.split('');

		for (let i = 0; i < 5; i++) {
			if (guessWordSplit[i] === answerSplit[i]) {
				result[i] = {letter: guessWordSplit[i], color: 'green'};
				answerSplit[i] = null;
			}
		}
		
		for (let i = 0; i < 5; i++) {
			if (result[i])
					continue;
			if (answerSplit.includes(guessWordSplit[i])) {
				result[i] = {letter: guessWordSplit[i], color: 'yellow'};
				const index = answer.indexOf(guessWordSplit[i]);
				answerSplit[index] = null;
			}
		}
		for (let i = 0; i < 5; i++) {
			if (!result[i]) {
				result[i] = {letter: guessWordSplit[i], color: 'gray'};
			}
		}
		console.log("result", result.map((r) => (`letterr: ${r.letter}, colorr: ${r.color}`)))
		return result;
	}



	return (
		<div>
			<div>THis is wordle</div>
			<Game currentGuess={currentGuess} arrayGues={arrayGues}/>
			{win && <p>YOU WIN CONGRATULATIONS! the word was: {answer}</p>}
			{lose && <p>YOU LOSE! the word was: {answer}</p>}
			<Keys/>
		</div>
	)
}

export default Wordle
