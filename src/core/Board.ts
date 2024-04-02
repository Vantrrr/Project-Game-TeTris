import * as PIXI from 'pixi.js';
import Game from './Game';
import { Constants } from './Constants';

export class Board {
    private constants: Constants;
    grid: any;

    constructor() {
        this.constants = new Constants();
        this.grid = this.generateWhiteBoard();
    }

    generateWhiteBoard() {
        return Array.from({ length: this.constants.ROWS }, () => Array(this.constants.COLS).fill(this.constants.WHITE_COLOR_ID));
    }

}

