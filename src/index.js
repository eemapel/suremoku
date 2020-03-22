import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {

  renderRow(row, size) {
    var rows = [];

    for (var x = 0; x < size; x++) {
      rows.push(<Square value={row * size + x} />)
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
