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
    </svg>
  )
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        squares: Array(15 * 15).fill(<Inter />),
        xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = <InterStone stoneColor={ (this.state.xIsNext ? "black" : "white") } />;
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderRow(row, size) {
    var rows = [];

    for (var x = 0; x < size; x++) {
      let idx = row * size + x;
      rows.push(<Square value={this.state.squares[idx]} onClick={ () => this.handleClick(idx) } />)
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
    const status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
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
