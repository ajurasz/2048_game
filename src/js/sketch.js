import p5 from 'p5';
import Game from './game';

const sketch = p => {
  let game;

  p.setup = () => {
    game = new Game(p);
    game.draw();
  };

  p.draw = () => {};

  p.keyPressed = () => {
    switch (p.keyCode) {
      case p.UP_ARROW:
        game.moveUp();
        break;
      case p.RIGHT_ARROW:
        game.moveRight();
        break;
      case p.DOWN_ARROW:
        game.moveDown();
        break;
      case p.LEFT_ARROW:
        game.moveLeft();
        break;
    }
    game.draw();
  };
};

var Sketch = new p5(sketch);
