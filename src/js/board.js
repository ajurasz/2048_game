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
            i,
            j
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
    this.grid[position.i][position.j] = Math.random() > 0.9 ? 4 : 2;
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

  copy() {
    const copy = new Board(this.size);
    copy.grid = this.grid.map(row => row.slice());
    return copy;
  }

  print() {
    console.table(this.grid);
  }
}
