import React, { useEffect, useRef, useState } from 'react'
import Ball from './components/Ball'
import { nanoid } from 'nanoid'
import ReactConfetti from 'react-confetti'

function App() {

  const generateRandom = () => {
   return new Array(10).fill(0).map(() => ({
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid()
   }))
  }
  
  const [dice, setDice] = useState(generateRandom())
  const [time, setTime] = useState(0)

  function handleRoll(){
    setDice(prevDice => prevDice.map((item) => {
      return item.isHeld ? item : {...item, value: Math.ceil(Math.random()*6) }
    }))
  }
  
  function handleClick(id){
    setDice(prevDice => prevDice.map((item) => {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item
    }))
  }

  function handleNewGame(){
    setDice(generateRandom())
    setTime(0)
  }

  const gameRef = useRef(null)
  const gameWon = (dice.every((die) => die.isHeld)) && 
                  (dice.every((die) => die.value === dice[0].value))

  useEffect(() => {
    if(gameWon){
      gameRef.current.focus()
    }

    if(gameWon) return;

    const interval = setInterval(() => {
      setTime(prev => prev+1)
    }, 1000)

    return () => clearInterval(interval)

  }, [gameWon])


  return (
    <>
    <div className="min-h-screen flex flex-col bg-sky-950">
      {gameWon && <ReactConfetti />}

      <header className="text-2xl bg-green-400 flex justify-center p-3 font-bold">
        Tenzies
      </header>

      <em className="flex justify-center text-center px-4 py-2 text-white">
        Roll until all dice are same. Click each dice to freeze it at its current value between rolls.
      </em>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md aspect-square border-4 border-gray-200 p-4">
          <div className="w-full h-full grid grid-cols-5 grid-rows-3 border-2 border-gray-100 bg-amber-50 p-12 gap-4">
            
            {dice.map((die) => (
              <Ball
                key={die.id}
                {...die}
                handleClick={handleClick}
              />
            ))}

          <div className="col-span-5 flex justify-center items-center">
              <button
                ref={gameRef}
                onClick={gameWon ? handleNewGame : handleRoll}
                className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-500 active:scale-95 transition"
              >
                {gameWon ? "New Game" : "Roll"}
              </button>
            </div>
            <div className="col-span-5 flex justify-center items-center p-2">
              {gameWon && (
                <p className="
                  text-green-700
                  text-base
                  font-medium
                  bg-green-100
                  px-2 py-1
                  rounded-full
                  shadow-sm
                ">
                  🎉 You won in <span className="font-bold">{time}</span> seconds!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default App
