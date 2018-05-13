import Board from './board';

export const BOARD_SIZE = 4;
export const CELL_SIZE = 100;

export default class Game {
  constructor(p5) {
    this.p5 = p5;
    this.canvas = p5.createCanvas(
      BOARD_SIZE * CELL_SIZE + 2,
      BOARD_SIZE * CELL_SIZE + 2
    );
    this.board = new Board(BOARD_SIZE);
    this.board.addNumber();
    this.board.addNumber();
    this.board.print();
  }

  moveRight() {
    this.board.slide();
    this.board.addNumber();
  }

  draw() {
    this.p5.noLoop();
    this.p5.background(255);
    this.p5.stroke(0);
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        this.p5.rect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE, 15);
        const value = this.board.grid[j][i];
        if (value !== 0) {
          this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
          this.p5.textSize(32);
          this.p5.text(
            value,
            i * CELL_SIZE + CELL_SIZE / 2,
            j * CELL_SIZE + CELL_SIZE / 2
          );
        }
      }
    }
  }
}