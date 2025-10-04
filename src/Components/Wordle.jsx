import { useState, useEffect } from "react";

const WORDS = [
  "cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade",
  // ... (full list truncated; add the rest from the Gist)
];


const Game = ({focusCell, setFocusCell, rowsCell}) => {

  const emptyRow = Array(10).fill({something: ''});
  const rows = rowsCell.slice()

  while (rows.length < 10)  {
    rows.push(emptyRow)
  }

  const selectFocusCell = (index) => {
    console.log("selectFocus cell Index -> ", index)
    setFocusCell(index)
  }

  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(10, 60px)', gap: '5px', justifyContent: 'center'}}>
    {
      rows.flat().map((row, index) => (<div onClick={() => selectFocusCell(index)} key={index} style={{width: '60px', height: '60px', backgroundColor: 'gray', 
        border: focusCell === index ? '2px solid blue' : '2px solid black'}}>
        {row.something}</div>))
    }
    </div>
  )
}

const Wordle = () => {

  const [focusCell, setFocusCell] = useState(null);
  const [rowsCell, setRowsCell] = useState([])

  useEffect(() => {
    function handleKey(e) {
      const letter = e.key;
      if (letter.length === 1 && /[A-Za-z]/.test(letter)) {
        if (focusCell !== null) {
          const tempWord = getCurrentWord(focusCell);
          tempWord[focusCell%10] = letter;
          console.log("tempWword: ", tempWord);
          let joinWord = '';
          for (let i = 0; i < 10; i++) {
            if (tempWord[i] !== ' ') joinWord += tempWord[i];
            else joinWord += ' ';
          }
          updateRowsCell(joinWord)
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [rowsCell, focusCell])

  const getCurrentWord = (index) => {
    const row = Math.floor(index/10);
    let word = '';
    if (row >= rowsCell.length) {
      return word.padEnd(10).split('');
    }
    rowsCell[row].forEach(row => {word += row.something})
    return (word.padEnd(10).split(''));
  }

  const updateRowsCell = (joinWord) => {
    const row = Math.floor(focusCell/10);
    console.log("UpdateRowsCell, Row ->", row);
    const emptyRow = Array(10).fill({something: ''});
    const rowsUpdated = rowsCell.slice();
    let i = 0;
    while (row > rowsUpdated.length ) {
      console.log("i -> ", i++);
      rowsUpdated.push(emptyRow);
    }
    if (rowsUpdated.length <= 10) {
      const word = joinWord.padEnd(10).split('').map(letter => ({something: letter}));
      console.log("word -> '", word.map(w => w.something), "'")
      rowsUpdated[row] = word; 
    }
    setRowsCell(rowsUpdated);

  }


  return (
    <div>
      <Game focusCell={focusCell} setFocusCell={setFocusCell} rowsCell={rowsCell}/>
    </div>
  );
}

export default Wordle;