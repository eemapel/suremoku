class BoardLogic {
  constructor() {
    this.array = Array(15 * 15).fill(0);
    this.history = []
  }

  isEmpty(idx) {
    return !this.array[idx]
  }

  setMove(idx) {
    this.array[idx] = 1 + (idx % 2)
    this.history.push(idx)

    // Return condition (TODO: need to define)
    return 0
  }
}

module.exports = BoardLogic;
