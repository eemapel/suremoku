import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*class Square extends React.Component {

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}*/

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
        squares: Array(15 * 15).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
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
    const status = 'Next player: X';
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
