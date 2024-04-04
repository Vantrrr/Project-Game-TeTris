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
        // this.brick.moveLeft();
        // this.brick.moveRight();
        // this.brick.moveDown();
        // this.brick.rotate();
       document.addEventListener('keydown', (e: KeyboardEvent) => {
        console.log({e});
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
        return this.app;
    }

}