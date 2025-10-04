import { useState, useEffect, useContext } from "react";
import { WordleContext } from "../context/WordleContext";

const WORDS = [
  "cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade",
  // ... (full list truncated; add the rest from the Gist)
];

const Game = ({guesses, focusCell, setFocusCell, currentGuess, win}) => {
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
    <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 60px)',
    justifyContent: 'center',
    gap: '8px',
  }}
>
  {rows.flat().map((row, index) => (
    <div
      key={index}
      onClick={() => updateFocusCell(index)}
      style={{
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color:
          row.color === 'yellow'
            ? '#333'
            : row.color
            ? 'white'
            : '#222',
        backgroundColor:
          row.color === 'green'
            ? '#22c55e' // nice green
            : row.color === 'yellow'
            ? '#facc15' // nice yellow
            : row.color
            ? '#9ca3af' // gray
            : '#f9fafb', // light white/gray background
        border:
          focusCell === index
            ? '2px solid #3b82f6' // blue border for focus
            : '2px solid #d1d5db', // soft gray border
        borderRadius: '8px',
        boxShadow:
          focusCell === index
            ? '0 0 8px rgba(59,130,246,0.4)'
            : '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
      }}
    >
      {row.letter}
    </div>
  ))}
</div>

  )
}

const Wordle = () => {
  const [focusCell, setFocusCell] = useState(0);
  const {guesses, setGuesses, currentGuess, setCurrentGuess, answer, setAnswer, win, setWin, lose, setLose} = useContext(WordleContext);
  
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
        <div className="mb-6">
          <Game
            guesses={guesses}
            focusCell={focusCell}
            setFocusCell={setFocusCell}
            currentGuess={currentGuess}
            win={win}
          />
        </div>

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