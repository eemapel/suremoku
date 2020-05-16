import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        squares: Array(15 * 15).fill(<Inter />),
        prev: null,
        depth: 0
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    // Previous move
    if (this.state.depth)
      squares[this.state.prev] = <InterStone stoneColor={ (this.state.depth % 2 ? "black" : "white") } lastMoveMarker="0" />;

    // Current move
    squares[i] = <InterStone stoneColor={ (this.state.depth % 2 ? "white" : "black") } lastMoveMarker="1" />;

    this.setState({
      squares: squares,
      prev: i,
      depth: this.state.depth + 1
    });
  }

  renderRow(row, size) {
    var rows = [];

    for (var x = 0; x < size; x++) {
      let idx = row * size + x;
      rows.push(<Square value={this.state.squares[idx]} onMouseDown={ () => this.handleClick(idx) } />)
    }

    return rows
  }

  renderAll(size) {
    var columns = [];
    for (var y = 0; y < size; y++) {
       columns.push(
         <div>
           {this.renderRow(y, size)}
         </div>
       )
    }
    return columns
  }
  
  render() {
    const status = 'Next to move: '+ (this.state.depth % 2 ? 'white' : 'black');
    return (
      <div>
        <div className="status">{status}</div>
        {this.renderAll(15)}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
