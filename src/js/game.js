import Board from './board';

export const BOARD_SIZE = 3;
export const CELL_SIZE = 100;

export default class Game {
  constructor(p5) {
    this.finished = false;
    this.p5 = p5;
    this.canvas = p5.createCanvas(
      BOARD_SIZE * CELL_SIZE + 2,
      BOARD_SIZE * CELL_SIZE + 2
    );
    this.board = new Board(BOARD_SIZE);
    this.board.addNumber();
    this.board.addNumber();
    this.position = undefined;
  }

  canPlay(fn) {
    if (!this.finished) {
      fn();
    }
  }

  _move(fn) {
    this.canPlay(() => {
      const copy = this.board.copy();
      fn();
      try {
        if (!_.isEqual(copy, this.board)) {
          this.position = this.board.addNumber();
        }
      } catch (e) {
        this.finished = true;
        this.drawGameOverOverlay();
      }
    });
  }

  moveRight() {
    this._move(() => {
      this.board.slide();
      this.board.combine();
    });
  }

  moveLeft() {
    this._move(() => {
      this.board.flipBack();
      this.board.slide();
      this.board.combine();
      this.board.flipBack();
    });
  }

  moveDown() {
    this._move(() => {
      this.board.flipLeft();
      this.board.slide();
      this.board.combine();
      this.board.flipRight();
    });
  }

  moveUp() {
    this._move(() => {
      this.board.flipRight();
      this.board.slide();
      this.board.combine();
      this.board.flipLeft();
    });
  }

  draw() {
    this.canPlay(() => {
      this.p5.noLoop();
      this.p5.background(255);
      this.p5.strokeWeight(1);
      this.p5.stroke(0);
      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
          const value = this.board.grid[j][i];
          this.p5.noFill();
          if (this.position && this.position.y === i && this.position.x === j) {
            this.p5.strokeWeight(5);
            this.p5.stroke(200, 100, 50);
          } else {
            this.p5.strokeWeight(1);
            this.p5.stroke(0);
          }
          this.p5.rect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE, 15);
          if (value !== 0) {
            this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
            this.p5.textSize(32);
            this.p5.strokeWeight(1);
            this.p5.stroke(0);
            this.p5.fill(0);
            this.p5.text(
              value,
              i * CELL_SIZE + CELL_SIZE / 2,
              j * CELL_SIZE + CELL_SIZE / 2
            );
          }
        }
      }
    });
  }

  drawGameOverOverlay() {
    this.p5.noStroke();
    this.p5.fill(166, 169, 173, 200);
    this.p5.rect(0, 0, this.p5.width, this.p5.height, 15);
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    this.p5.stroke(0);
    this.p5.fill(255, 0, 0);
    this.p5.text('GAME OVER', this.p5.width / 2, this.p5.height / 2);
    throw new Error('Game over');
  }
}
