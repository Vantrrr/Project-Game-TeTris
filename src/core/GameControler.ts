import * as PIXI from 'pixi.js';
import { Constants } from './Constants';
import { Board } from './Board';
import { Brick } from './Bricks';
import { GameView } from './GameView';

export default class Game {
    private constants: Constants;
    private board: Board;
    private brick: Brick;
    private gameView: GameView;

    constructor() {
        this.constants = new Constants();
        this.gameView = new GameView();
        this.board = new Board(this);
        this.brick = new Brick(0, this);
        this.board.drawBoard();
        this.brick.draw();

        setInterval(() => {
            this.brick.moveDown();
        }, 1000);

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            console.log({ e });
            switch (e.code) {
                case this.constants.KEY_CODES.LEFT:
                    this.brick.moveLeft();
                    break;
                case this.constants.KEY_CODES.RIGHT:
                    this.brick.moveRight();
                    break;
                case this.constants.KEY_CODES.UP:
                    this.brick.rotate();
                    break;
                case this.constants.KEY_CODES.DOWN:
                    this.brick.moveDown();
                    break;
            }
        });
    }

    public getApp(): PIXI.Application {
        return this.gameView.getApp();
    }
    generateNewBrick() {
        this.brick = new Brick(Math.floor(Math.random() * 10) % this.constants.BRICK_LAYOUT.length, this);
    }
}
