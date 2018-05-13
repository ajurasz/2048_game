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
    game.moveRight();
    game.draw();
  };
};

var Sketch = new p5(sketch);
