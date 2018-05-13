import _ from 'lodash';
import { BOARD_SIZE } from './game';

export default class Board {
  constructor(size) {
    this.size = size;
    this.grid = new Array(size).fill().map(_ => new Array(size).fill(0));
  }

  getEmptyCells() {
    const options = [];
    this.grid.forEach((row, i) =>
      row.forEach((column, j) => {
        if (column === 0) {
          options.push({
            x: i,
            y: j
          });
        }
      })
    );

    return options;
  }

  addNumber() {
    const slots = this.getEmptyCells();
    if (slots.length === 0) throw new Error('No empty slots left');
    const position = _.sample(slots);
    this.grid[position.x][position.y] = Math.random() > 0.9 ? 4 : 2;

    return position;
  }

  slide() {
    this.grid.forEach((row, index) => {
      const values = row.filter(el => el !== 0);
      this.grid[index] = new Array(this.size - values.length)
        .fill(0)
        .map(_ => _)
        .concat(values);
    });
  }

  double(x) {
    return x * 2;
  }

  combine() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE - 1; j++) {
        if (this.grid[i][j] === this.grid[i][j + 1]) {
          this.grid[i][j] = 0;
          this.grid[i][j + 1] = this.double(this.grid[i][j + 1]);
        }
      }
    }
  }

  flipBack() {
    this.grid.forEach(row => row.reverse());
  }

  flipLeft() {
    const newGrid = new Array(this.size)
      .fill()
      .map(_ => new Array(this.size).fill(0));

    for (let i = 0; i < BOARD_SIZE; i++) {
      let k = BOARD_SIZE - 1 - i;
      for (let j = 0; j < BOARD_SIZE; j++) {
        newGrid[i][j] = this.grid[j][k];
      }
    }

    this.grid = newGrid;
  }

  flipRight() {
    const newGrid = new Array(this.size)
      .fill()
      .map(_ => new Array(this.size).fill(0));

    for (let i = BOARD_SIZE - 1; i >= 0; i--) {
      for (let j = BOARD_SIZE - 1; j >= 0; j--) {
        newGrid[i][j] = this.grid[BOARD_SIZE - 1 - j][i];
      }
    }
    this.grid = newGrid;
  }

  copy() {
    const copy = new Board(this.size);
    copy.grid = this.grid.map(row => row.slice());
    return copy;
  }

  print() {
    console.table(this.grid);
  }
}
