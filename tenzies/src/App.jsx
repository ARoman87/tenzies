import './App.css'
import Dice from "./components/Dice"
import React from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


function App() {
  
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies , setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(0)



  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  
  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }
    else {
      setTenzies(false)
      setDice(allNewDice())
      setCount(0 - 1)
    } 
  }
  
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function counter() {
    setCount(prevCount => prevCount + 1)
  }
  
  const dieElements = dice.map(die => <Dice key={die.id} value={die.value} styles={die.isHeld} holdDice={ () => holdDice(die.id)}/>)
  
  
  

  return (
    <div className="gameContainer">
      {tenzies && <Confetti />}
      <div className='gameBox'>
        <div className='inside'>
          <h3>Count: {count}</h3>
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="diceContainer">
              {dieElements} 
          </div>

          <div className='button'>
            <button onClick={() => {rollDice(), counter()}}>{tenzies ? "New Game" : "Roll"}</button>
          </div>
          
        </div>
        
      </div>
    </div>
  )
}

export default App
