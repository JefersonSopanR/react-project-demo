import { useState, useEffect, useContext } from "react";
import { WordleContext } from "../context/WordleContext";

const WORDS = [
  "cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade",
  // ... (full list truncated; add the rest from the Gist)
];

const Game = ({guesses, focusCell, setFocusCell, currentGuess, win, lose}) => {
  const empty = Array(5).fill({letter: '', color: ''});
  const rows = guesses.slice();

  if (rows.length < 5) {
    const word = currentGuess.padEnd(5).split('').map(l => ({letter: l, color: ''}));
    rows.push(word);
  }

  while (rows.length < 5) {
    rows.push(empty);
  }

  const updateFocusCell = (index) => {
    if (win) return;
    const rowBounderTop = guesses.length * 5 + 5;
    const rowBounderBottom = guesses.length * 5;
    if ((index >= rowBounderBottom) && (index < rowBounderTop))
      setFocusCell(index);
  }

  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 60px)', justifyContent: 'center', gap: '5px'}}>
      { rows.flat().map((row, index) => (<div onClick={() => updateFocusCell(index)} key={index} style={{width: '60px', height: '60px', 
      backgroundColor: row.color === 'green' ? 'green' : row.color === 'yellow' ? 'yellow' : row.color ? 'gray' : 'white', border: focusCell === index ? '2px solid blue' : '2px solid gray'}}>{row.letter}</div>))

      }
    </div>
  )
}

const Wordle = () => {
  const [focusCell, setFocusCell] = useState(0);
  const {guesses, setGuesses, currentGuess, setCurrentGuess, answer, setAnswer, win, setWin, lose, setLose} = useContext(WordleContext);
  const [optionGame, setOptionGame] = useState('');
  
  useEffect(() => {
    setAnswer(WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase());
  }, [])

  useEffect(() => {
    function handleKey(e) {
      if (win || lose) return;
      const key = e.key.toUpperCase();
      if (key.length === 1 && /[A-Z]/.test(key)) {
        if (focusCell !== null) {
          const splitCurrentGuess = currentGuess.padEnd(5).split('');
          splitCurrentGuess[focusCell%5] = key;
          let joinCurrentGuess = '';
          for (let i = 0; i < splitCurrentGuess.length; i++) {
            if (splitCurrentGuess[i] !== '') joinCurrentGuess += splitCurrentGuess[i];
            else joinCurrentGuess += '';
          }
          setCurrentGuess(joinCurrentGuess);
          const rowBounderTop = guesses.length * 5 + 5;
          if (focusCell < rowBounderTop - 1)
            setFocusCell(focusCell + 1);
        } /*else {
          if (currentGuess.length < 5) {
            setCurrentGuess(currentGuess + key);
          }
        }*/
      } else if (e.key === 'Backspace' && currentGuess.length > 0) {
        if (focusCell !== null) {
          const splitCurrentGuess = currentGuess.padEnd(5).split('');
          splitCurrentGuess[focusCell%5] = ' ';
          let joinCurrentGuess = '';
          for (let i = 0; i < splitCurrentGuess.length; i++) {
            if (splitCurrentGuess[i] !== '') joinCurrentGuess += splitCurrentGuess[i];
            else joinCurrentGuess += '';
          }
          setCurrentGuess(joinCurrentGuess);
          const rowBounderBottom = guesses.length * 5;
          if (focusCell > rowBounderBottom)
            setFocusCell(focusCell - 1);
        } /*else {
          setCurrentGuess(currentGuess.slice(0, -1));
        }*/
      } else if (e.key === 'Enter' && guesses.length < 6 && !currentGuess.includes(' ') && currentGuess.length === 5) {
        setGuesses([...guesses, treatCurrentGuess(currentGuess)])
        setCurrentGuess('');
        setFocusCell(guesses.length * 5 + 5);
        if (currentGuess === answer) {setWin(true); setFocusCell(null)}
        else if (guesses.length >= 4) setLose(true);
      } else if (e.key === 'ArrowLeft') {
        const rowBounderBottom = guesses.length * 5;
          if (focusCell > rowBounderBottom)
            setFocusCell(focusCell - 1);
      } else if (e.key === 'ArrowRight') {
        const rowBounderTop = guesses.length * 5 + 5;
          if (focusCell < rowBounderTop - 1)
            setFocusCell(focusCell + 1);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [focusCell, currentGuess])

  const treatCurrentGuess = (guess) => {
    const arrayGuess = guess.split('');
    const arrayAnswer = answer.split('');
    const result = [];
    
    for (let i = 0; i < arrayGuess.length; i++) {
      if (arrayGuess[i] === arrayAnswer[i]) {
        result[i] = {letter: arrayGuess[i], color: 'green'};
        arrayAnswer[i] = null;
      }
    }

    for (let i = 0; i < arrayGuess.length; i++) {
      if (result[i]) continue;
      else if (arrayAnswer.includes(arrayGuess[i])) {
        result[i] = {letter: arrayGuess[i], color: 'yellow'};
        const index = arrayAnswer.indexOf(arrayGuess[i]);
        arrayAnswer[index] = null; 
      }
    }

    for (let i = 0; i < arrayGuess.length; i++) {
      if (!result[i]) {
        result[i] = {letter: arrayGuess[i], color: 'gray'};
      }
    }
    return result;
  }

  return (
  <div className="flex justify-center px-4">
    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 text-center">
      
      {/* Game Mode Buttons */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setOptionGame("wordleTimer")}
          className={`px-5 py-2 rounded-full shadow-sm font-medium transition ${
            optionGame === "wordleTimer"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          Wordle with Timer
        </button>
        <button
          onClick={() => setOptionGame("wordleStandar")}
          className={`px-5 py-2 rounded-full shadow-sm font-medium transition ${
            optionGame === "wordleStandar"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          Wordle Standard
        </button>
        <button
          onClick={() => setOptionGame("wordleLevels")}
          className={`px-5 py-2 rounded-full shadow-sm font-medium transition ${
            optionGame === "wordleLevels"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          Wordle Levels
        </button>
      </div>

      {/* Game Board */}
      {optionGame === "wordleStandar" && (
        <div className="mb-6">
          <Game
            guesses={guesses}
            focusCell={focusCell}
            setFocusCell={setFocusCell}
            currentGuess={currentGuess}
            win={win}
            lose={lose}
          />
        </div>
      )}

      {/* Results */}
      {win && (
        <p className="text-green-600 font-semibold text-lg">
          🎉 YOU WIN! CONGRATULATIONS! <br /> The word was:{" "}
          <span className="font-bold uppercase">{answer}</span>
        </p>
      )}
      {lose && (
        <p className="text-red-600 font-semibold text-lg">
          ❌ YOU LOSE! <br /> The word was:{" "}
          <span className="font-bold uppercase">{answer}</span>
        </p>
      )}
    </div>
  </div>
);

};

export default Wordle;