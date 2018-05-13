import _ from 'lodash';

export default class Board {
  constructor(size) {
    console.log('Board constructor');
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

  print() {
    console.table(this.grid);
  }
}
