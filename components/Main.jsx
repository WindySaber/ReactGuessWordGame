import { languages } from "../src/languages"
import { getFarewellText,getRandomWord } from "../src/utils"
import { useState } from "react"
import clsx from "clsx"
import Confetti from "react-confetti"

export default function Header(){
    const [currentWord,setCurrentWord] = useState(() => getRandomWord())
    const [gress,setGress] = useState([])
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const wrongCount = gress.filter(letter => !currentWord.includes(letter)).length
    const isGameWin = currentWord.split("").every(letter => gress.includes(letter))
    const isGameLost = (wrongCount>=languages.length-1)
    const isGameOver = isGameLost || isGameWin
    const isLastGressWrong = gress.length>0 && !currentWord.includes(gress[gress.length-1])

    const languageEle = languages.map((language,index) => {
        const style = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        const className = clsx("clip",wrongCount-index>0 && "lost")

        return(
            <span 
                style={style} 
                key={language.name} 
                className={className}
            >{language.name}</span>
        )
    })
    
    const wordEle = currentWord.split('').map((letter,index) => {
        const isShowLetter = gress.includes(letter) || isGameLost
        const className = clsx("letter",isGameOver && !gress.includes(letter) && "missed-letter")

        return (
            <>
                <span className={className} key={index}>{isShowLetter && letter.toUpperCase()}</span>
            </>
        )
    })

    const keyboardEle = alphabet.split('').map(letter => {
        const isGress = gress.includes(letter)
        const iscorrect = isGress && currentWord.includes(letter)
        const iswrong = isGress && !currentWord.includes(letter)
        const className = clsx({
                keyword: true,
                correct: iscorrect,
                wrong: iswrong
        })

        return (
            <button 
                className={className}
                key={letter} 
                disabled={isGameOver}
                aria-disabled={gress.includes(letter)}
                aria-label={`Letter ${letter}`}
                onClick={() => addGress(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    function addGress(letter){
        setGress(prevGress => 
            prevGress.includes(letter)? prevGress: [...prevGress,letter]
        )
    }

    function newGame(){
        setCurrentWord(() => getRandomWord())
        setGress([])
    }

    return (
        <>
            {isGameWin && <Confetti recycle={false} numberOfPieces={2500} />}
            <header>
                <h1>Assembly:Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
            </header>
            <div 
                aria-live="polite"
                role="status"
                className={clsx(
                    "normal-state",
                    isGameWin && "success-state",
                    isGameLost && "lost-state",
                    isLastGressWrong && !isGameOver && "wrong-text"
                )}
            >
                {isGameOver && <span>{isGameWin? "You win!": (isGameLost? "Game Over!": null)}</span>}
                {isGameOver && <p>{isGameWin? "Well done! 🎉": (isGameLost? "You lose!Better start learning Assembly 😭": null)}</p>}
                {isLastGressWrong && !isGameOver && <p>{getFarewellText(languages[wrongCount-1].name)}</p>}
            </div>
            <div className="language-box">
                {languageEle}
            </div>
            <div className="word-box">
                {wordEle}
            </div>

            {/* Combined visually-hidden aria-live region for status updates */}
            <section 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
                <p>
                    {currentWord.includes(gress[gress.length-1]) ? 
                        `Correct! The letter ${gress[gress.length-1]} is in the word.` : 
                        `Sorry, the letter ${gress[gress.length-1]} is not in the word.`
                    }
                    You have {languages.length-1} attempts left.
                </p>
                <p>Current word: {currentWord.split("")
                    .map(letter => gress.includes(letter) ? letter + "." : "blank.")
                    .join(" ")}
                </p>
            
            </section>

            <div className="keyboard-box">
                {keyboardEle}
            </div>
            {isGameOver && <button className="new-game" onClick={newGame}>New Game</button>}
        </>
    )
}