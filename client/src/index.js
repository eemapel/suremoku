import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const Logic = require('./logic.js');
let G = new Logic();

const initialState = {
  squares: Array(15 * 15).fill(<Inter />),
  prev: null,
  depth: 0,
  win: false
};

function Inter() {
  return (
    <svg viewBox="0 0 25 25">
     <path stroke="black" d="
       M 12,0
       L 12,24
       M 0,12
       L 24,12
     " />
    </svg>
  )
}

function InterStone(props) {
  return (
    <svg viewBox="0 0 25 25">
      <path stroke="black" d="
        M 12,0
        L 12,24
        M 0,12
        L 24,12
      " />
      <circle cx="12" cy="12" r="11" stroke="black" strokeWidth="1" fill={props.stoneColor} />
      <circle cx="12" cy="12" r="2" fill="red" fillOpacity={props.lastMoveMarker} />
    </svg>
  )
}

function Square(props) {
  return (
    <button className="square" onMouseDown={props.onMouseDown}>
      {props.value}
    </button>
  )
}

function Restart({ onClick }) {
  return (
    <button className="restart" onClick={onClick}>
      New Game
    </button>
  )
}

class BoardUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  reset() {
    this.setState(initialState);
  }

  getResponse = async() => {
      const response = await fetch('api/hello');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
  }

  postMove = async data => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: data })
    };

    const response = await fetch('api/world', requestOptions);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    // Do nothing if square not empty or game already won
    if (!G.isEmpty(i) || this.state.win) return

    // Test express server
    this.getResponse()
      .then(res => { console.log(res) })

    this.postMove('abc')
      .then(res => { console.log(res) })

    let cond = G.setMove(i)

    // Previous move
    if (this.state.depth)
      squares[this.state.prev] = <InterStone stoneColor={ (this.state.depth % 2 ? "black" : "white") } lastMoveMarker="0" />;

    // Current move
    squares[i] = <InterStone stoneColor={ (this.state.depth % 2 ? "white" : "black") } lastMoveMarker="1" />;

    this.setState({
      squares: squares,
      prev: i,
      depth: this.state.depth + 1,
      win: cond
    });
  }

  renderRow(row, size) {
    var rows = [];

    for (var x = 0; x < size; x++) {
      let idx = row * size + x;
      rows.push(<Square key={idx} value={this.state.squares[idx]} onMouseDown={ () => this.handleClick(idx) } />)
    }

    return rows
  }

  renderAll(size) {
    var columns = [];
    for (var y = 0; y < size; y++) {
       columns.push(
         <div key={y}>
           {this.renderRow(y, size)}
         </div>
       )
    }
    return columns
  }

  renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          console.log("restarting..")
          this.reset()
          G = new Logic();
        }}
      />
    );
  }

  render() {
    let status

    if (this.state.win)
      status = 'Winner: ' + (this.state.depth % 2 ? 'black': 'white');
    else
      status = 'Next to move: '+ (this.state.depth % 2 ? 'white' : 'black');

    return (
      <div>
        <div className="status">{status}</div>
        {this.renderAll(15)}
        &nbsp;
        <div className="restart-button">{this.renderRestartButton()}</div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <BoardUI />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
