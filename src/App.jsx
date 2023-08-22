/* eslint-disable react/prop-types */
import { useState } from 'react'


const Square = ({value, onSquareClick}) => {

  // const [value, setValue] = useState('');

  // function handleClick(){
  //     setValue('X');
  // }

  return(
    <button className="square" onClick={onSquareClick}>{value}</button>
  )
}

function App({xIsNext, squares, onPlay}) {

  
  

  // fungsi untuk mengubah isi dari array squares dengan cara membuat array baru, tujuaanya untuk mengelola historynya nanti
  // karna kita jadi punya array baru dan array lama
  function handleClick(i){

    //jika square ada isinya atau kalau udah ada yang menang maka jangan jalankan code dibawahnya
    if(squares[i] || calculateWinner(squares)) return;

    // bikin array yang sama persis dengan array squares
    const nextSquares = squares.slice();
    // console.log(nextSquares);

    //jika xIsNext true maka artinya giliran X
    //menganti nilai sesuai dengan indeks yang diclick, contoh yang diclick adalah indeks ke 0 atau kotak pertama di sebelah kiri
    //['X', null, null, null, null, null, null, null, null
    nextSquares[i] = xIsNext ? 'X' : 'O';
    
    // setSquares(nextSquares);
    
    // setXIsNext(!xIsNext)

    //definisikan keadaan berikutnya pada saat bermain
    onPlay(nextSquares)
  }

  //tankap siapa yang menang
  const winner = calculateWinner(squares);
  // console.log(winner);
  let status = '';
  if(winner){
    status = `Winner: ${winner}`;
  }else{
    status = 'Next player: ' + (xIsNext ? 'X' : '0') //jika xIsNext true maka giliran X dan sebaliknya
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board'>
      {/* ambil element array squares yang indeksnya 0 dan liat isinya O atau X atau null */}
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  )
}

function Game(){
  //buat state untuk mengatur apakah selanjutnya X atau O, giliran pertama selalu X maka dari itu nilai awal dari xIsNext adalah true
  // const [xIsNext, setXIsNext] = useState(true);
  //buat array 9 element, lalu isi nilai awalnya dengan null
  //nanti bentuknya gini jika ada user yang click
  /**
   * [
   *    [null, null, null, null, null, null, null, null, null] // kalau ada user ulang lagi gamenya dari awal maka akan buat array baru
   *    [null, null, null, null, null, null, null, null, null] 
   * ]
   */
  const [history, setHistory] = useState([Array(9).fill(null)])

  const [currentMove, setCurrentMove] = useState(0); //currentMove pertama pasti 0

  const xIsNext = currentMove % 2 === 0;

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    //move genap pasti x dan move ganjil pasti O
    // setXIsNext(nextMove % 2 === 0);
  }

  //kita ingin mengetahui keadaan squares saat ini, yang berarti kita harus tau keadaan array yang paling akhir
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
      //ambil array dari indeks ke 0 sampai tergantu ke kita mau jumpTo kemana
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
      //nambahin array baru 
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      //ubah yang tadinya true jadi false dan yang tadinya false ubah jadi true
      // setXIsNext(!xIsNext);
  }

  const moves = history.map((squares, move) => {
    let description = '';
    if(move > 0){
      description = `Go to move #` + move;
    }else{
      description = 'Go to game start'
    }

    return(
      <li key={move}>
        {/* fungsi jumpTo untuk menghandle user yang mau loncar ke history yang mana  */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return(
    <div className='game'>
      <div className='game-board'>
        <App xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>

      <div className='game-info'>
          <ol>
              {moves}
          </ol>
      </div>
    </div>
  )
}

//fungsi untuk menentukan bentuk apa aja yang bikin user menang
//jika dia X atau Onya horizontal atau vertikal atau bisa juga diagonal
function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let i = 0; i < lines.length; i++){
    //destructurring array
    //ambil indeks ke 0, 1, dan 2 di tiap lines[i]
    const [a, b, c] = lines[i];

    /**
     * jika isi dari squares a sama dengan squares b dan sama dengan squares C maka yang menang adalah squares tersebut
     */
    if(squares[a] == squares[b] && squares[b] == squares[c]){
      return squares[a];
    }
  }
  //kalau ditelurusin ternyata ngak ada yang menang
  return false;
}

export default Game;
