import * as PIXI from 'pixi.js';
import { Constants } from './Constants';
import { Board } from './Board';

export default class Game {
    private constants: Constants;
    private board: Board;
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
        this.board.drawCell(1, 1, 1);
    }

    public getApp(): PIXI.Application {
        return this.app;
    }

}