import './App.css'
import Dice from "./components/Dice"
import React from "react"

function App() {
  
  function allNewDice() {
    const array = []
    for(let i = 0; i < 10; i++) {
      array.push({
        key: i,
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    
    return array
  }
  


  const [dice, setDice] = React.useState(allNewDice())

  function rollDice() {
    setDice(prevDice => allNewDice())
  }


  const dieElements = dice.map(die => <Dice key={die.key} value={die.value} styles={die.isHeld} />)
  
  console.log(dice)

  return (
    <div className="gameContainer">
      <div className='gameBox'>
        <div className='inside'>
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="diceContainer">
              {dieElements} 
          </div>

          <div className='button'>
            <button onClick={rollDice}>Roll</button>
          </div>
          
        </div>
        
      </div>
    </div>
  )
}

export default App
