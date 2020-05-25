class BoardLogic {
  constructor() {
    this.array = Array(15 * 15).fill(0);
    this.history = []
  }

  isEmpty(idx) {
    return !this.array[idx]
  }

  removeMove(idx) {
    this.array[idx] = 0
    this.history.pop()
  }

  setMove(idx) {
    let color = 1 + (this.history.length % 2)
    this.array[idx] = color
    this.history.push(idx)

    // Return true if win
    return this.winCheck(idx)
  }

  winCheck(idx) {
    // Get X [0..14]
    let x = idx % 15
    // Get Y [0..14]
    let y = ~~(idx / 15)

    // Compare against last played move
    let color = this.array[idx]

    // Array for increments to check all 4 axis
    const axis = [1, 0, 0, 1, 1, 1, 1, -1]

    for (let i = 0; i < axis.length; i += 2) {
      let left = true
      let right = true
      let count = 1

      for (let m = 1; m <= 5; m++) {
        let xi = m * axis[i]
        let yi = m * axis[i + 1]

        if (left) {
          if (x - xi < 0 || x - xi > 14 || y - yi < 0 || y - yi > 14)
            left = false
          else if (this.array[(y - yi) * 15 + x - xi] !== color)
            left = false
          else count++;
        }

        if (right) {
          if (x + xi < 0 || x + xi > 14 || y + yi < 0 || y + yi > 14)
            right = false
          else if (this.array[(y + yi) * 15 + x + xi] !== color)
            right = false
          else count++;
        }
      }

      if (count === 5) return true
    }

    return false
  }
}

module.exports = BoardLogic;
