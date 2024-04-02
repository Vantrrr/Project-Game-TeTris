import * as PIXI from 'pixi.js';
import { Constants } from './Constants';
export default class Game {
    private constants : Constants;
    constructor() {
        this.constants = new Constants();

        this.constants.app = new PIXI.Application({ width: this.constants.COLS * this.constants.BLOCK_SIZE, height: this.constants.ROWS * this.constants.BLOCK_SIZE, backgroundColor: 0xffffff });
        window.document.body.appendChild(this.constants.app.view);
    }
}