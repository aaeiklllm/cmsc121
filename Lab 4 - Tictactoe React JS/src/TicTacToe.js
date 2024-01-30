import React from 'react'
import { useEffect, useState } from 'react'
import './TicTacToe.css';


const Tictactoe = () => {
    const [turn, setTurn] = useState('x')
    const [cells, setCells] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState()
    const [mode, setMode] = useState('1 player')
    const [isCPUNext, setIsCPUNext] = useState(false);
    let squares = [... cells]

    const isWin = (squares) => {
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6],
            ]
        }

        for (let combo in combos) {
            combos[combo].forEach((pattern) => {
                if (squares[pattern[0]] == '' || squares[pattern[1]] == '' || squares[pattern[2]] == ''){
                    // do nothing
                }
                else if (squares[pattern[0]] == squares[pattern[1]] && squares[pattern[1]] == squares[pattern[2]] ){
                    setWinner(squares[pattern[0]])
                }
            })
        }
    }

    async function handleClick(num){
        
        const emptyIndexes = []

        for (let i = 0; i < squares.length; i++){
            if (squares[i] == ''){
                emptyIndexes.push(squares[i])
            }
        }

        if (mode == '2 players'){
            if (squares[num] != ''){
                alert('This cell is already filled!')
            }
    
            else{
                if (turn == 'x'){
                    if (winner == 'x'){
                        //do nothing

                    }
                    else if (winner == 'o'){
                        //do nothing
                    }
                    else{
                        squares[num] = 'x'
                        setTurn('o')
                    }
                }

                else{
                    if (winner == 'x'){
                        //do nothing
                       
                    }
                    else if (winner == 'o'){
                        //do nothing
                    }
                    else{
                        squares[num] = 'o'
                        setTurn('x') 
                    } 
                }
                
                isWin(squares)
                setCells(squares)   
            }
        }

        else{ //1 player
            if (squares[num] != ''){
                alert('This cell is already filled!')
            }
    
            else{
                const min = 0
                const max = 8
                let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                
                if (turn == 'x'){
                    if (winner == 'x'){
                        //do nothing
                    }
                    else if (winner == 'o'){
                        //do nothing
                    }
                    else{
                        squares[num] = 'x'
                        setTurn('o')
                    }
                }
                
                isWin(squares)
                setCells(squares) 
                if (winner == 'x'){
                    //do nothing
                }
                else if (winner == 'o'){
                    //do nothing
                }
                else{
                    if (emptyIndexes.length == 1){
                        //do nothing
                    }
    
                    else{
                        await delay(1000)
                        setIsCPUNext(true)
                    }
                }
                    
                setCells(squares)     
                isWin(squares)
                
            }
        }
    }

    useEffect(() => {
        if (winner) return;
        if (isCPUNext && mode == '1 player') {
            CPUPlay();
        }
    }, [isCPUNext]);

    function CPUPlay(){
        if (winner) return;
        const min = 0
        const max = 8
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        if (squares[randomNum] != 'x' && squares[randomNum] != 'o' ){
            squares[randomNum] = 'o' 
            setTurn('x')
            setIsCPUNext(false)
        }
    
        else{
            while (squares[randomNum] == 'x' || squares[randomNum] == 'o' ){
               randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            }
            squares[randomNum] = 'o'
            setTurn('x')
            setIsCPUNext(false)
        }
        setCells(squares)
        isWin(squares)
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    const resetBoard_1_player = () => {
        setWinner()
        setTurn('x')
        setCells(Array(9).fill(''))
        setMode('1 player')
        setIsCPUNext(false)
    }

    const resetBoard_2_players = () => {
        setWinner()
        setTurn('x')
        setCells(Array(9).fill(''))
        setMode('2 players')
        setIsCPUNext(false)
    }
    
    const Square = ({num}) => {
        return <td onClick = {() => handleClick(num)}>{cells[num]}</td>
    }

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <h3> Turn: {turn} </h3>
      <h3> Mode: {mode} </h3>
      <table>
        <tbody>
            <tr>
                <Square num={0} />
                <Square num={1}/>
                <Square num={2} />
            </tr>
            <tr>
                <Square num={3} />
                <Square num={4}/>
                <Square num={5} />
            </tr>
            <tr>
                <Square num={6} />
                <Square num={7}/>
                <Square num={8} />
            </tr>   
        </tbody>
      </table>

    {winner && (
        <>
        <h3>{winner} wins!</h3>
        </>
    )}

    <button onClick = {() => resetBoard_1_player()}> 1 Player </button>
    <button onClick = {() => resetBoard_2_players()}> 2 Players </button>
    </div>
  )
}

export default Tictactoe
