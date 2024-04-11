import * as PIXI from 'pixi.js';
import Game from './GameControler';
export class Board {
    private app: PIXI.Application;
    private boardContainer: PIXI.Container;
    private game: Game;
    public grid: any;

    constructor(game: Game) {
        this.game = game;
        this.app = this.game.getApp();
        this.boardContainer = new PIXI.Container();
        this.app.stage.addChild(this.boardContainer);
        this.grid = this.generateWhiteBoard();
    }

    generateWhiteBoard() {
        return Array.from({ length: this.game.ROWS }, () => Array(this.game.COLS).fill(this.game.WHITE_COLOR_ID));
    }

    drawCell(xAxis: number, yAxis: number, colorID: number) {
        const cellGraphics = new PIXI.Graphics();
        const x = xAxis * this.game.BLOCK_SIZE;
        const y = yAxis * this.game.BLOCK_SIZE;
        const size = this.game.BLOCK_SIZE;
        const borderSize = 0.5;
        // const color = this.game.COLOR_MAPPING[colorID];

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



