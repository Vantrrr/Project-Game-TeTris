import * as PIXI from 'pixi.js';
import Game from './Game';
import { Constants } from './Constants';

export class Board {
    private app: PIXI.Application;
    private boardContainer: PIXI.Container;
    private constants: Constants;
    private game: Game;
    grid: any;
    gameOver: any;
    isPlaying: boolean;

    constructor(game: Game) {
        this.game = game;
        this.constants = new Constants();
        this.app = this.game.getApp();
        this.boardContainer = new PIXI.Container();
        this.app.stage.addChild(this.boardContainer);
        this.grid = this.generateWhiteBoard();
    }

    generateWhiteBoard() {
        return Array.from({ length: this.constants.ROWS }, () => Array(this.constants.COLS).fill(this.constants.WHITE_COLOR_ID));
    }

    drawCell(xAxis: number, yAxis: number, colorID: number) {
        const cellGraphics = new PIXI.Graphics();
        const x = xAxis * this.constants.BLOCK_SIZE;
        const y = yAxis * this.constants.BLOCK_SIZE;
        const size = this.constants.BLOCK_SIZE;
        const borderSize = 0.5;

        // Vẽ viền
        cellGraphics.lineStyle(borderSize, 0x000000, 1);
        cellGraphics.drawRect(x, y, size, size);

        // Vẽ màu nền
        cellGraphics.beginFill(colorID);
        cellGraphics.drawRect(x + borderSize, y + borderSize, size - 2 * borderSize, size - 2 * borderSize);
        cellGraphics.endFill();

        this.boardContainer.addChild(cellGraphics);
    }
    drawBoard() {
        // this.boardContainer.removeChildren(); // Clear the existing board before redrawing

        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }
}



