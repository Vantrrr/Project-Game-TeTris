import * as PIXI from 'pixi.js';
import { Constants } from './Constants';
import { Board } from './Board';
import { Brick } from './Bricks';

export default class Game {
    private constants: Constants;
    private board: Board;
    private brick: Brick;
    private app: PIXI.Application;

    constructor() {
        this.constants = new Constants();
        this.app = this.constants.app;

        this.app = new PIXI.Application({
            width: this.constants.COLS * this.constants.BLOCK_SIZE,
            height: this.constants.ROWS * this.constants.BLOCK_SIZE,
            backgroundColor: 0xffffff
        });

        window.document.body.appendChild(this.app.view);
        this.board = new Board(this);
        this.brick = new Brick(0, this);
        this.board.drawBoard();
        this.brick.draw();
        this.brick.moveLeft();

    }

    public getApp(): PIXI.Application {
        return this.app;
    }

}