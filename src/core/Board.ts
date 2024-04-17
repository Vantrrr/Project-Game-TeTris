import * as PIXI from 'pixi.js';
import Game from './GameControler';
export class Board {
    private app: PIXI.Application;
    private boardContainer: PIXI.Container;
    private game: Game;
    public grid: any;
    public score: number;
    private scoreUpdateCallback: () => void;
    constructor(game: Game) {
        this.game = game;
        this.app = this.game.getApp();
        this.boardContainer = new PIXI.Container();
        this.app.stage.addChild(this.boardContainer);
        this.grid = this.generateWhiteBoard();
        this.score = 0;
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
        const color = this.game.COLOR_MAPPING[colorID];

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
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }

    handleCompletRows() {
        const latestGrid = this.grid.filter((row: any[]) => {
            return row.some(col => col === this.game.WHITE_COLOR_ID);
        });
        const completedRows = this.game.ROWS - latestGrid.length;
        const newRows = Array.from({ length: completedRows }, () => Array(this.game.COLS).fill(this.game.WHITE_COLOR_ID));

        this.score += this.calculateScore(completedRows);
        this.grid = [...newRows, ...latestGrid];
        this.scoreUpdateCallback();
        console.log("Current Score:", this.getScore());
        
        if (completedRows > 0) {
            this.playEatSound();
        }
    }

    calculateScore(rowsCount: number): number {
        return (rowsCount * (rowsCount + 1)) / 2*100;
    
    }

    getScore(): number {
        return this.score;
    }

    setScoreUpdateCallback(callback: () => void) {
        this.scoreUpdateCallback = callback;
    }
        // âm thanh của game
        playEatSound() {//âm thanh ăn điểm
            const audio = new Audio('../assets/audio/258020__kodack__arcade-bleep-sound.mp3');
            audio.play();
        }
        // playGameOverSound() {// âm thanh nhạc game over
        //     const audio = new Audio('../assets/audio/251461__joshuaempyre__arcade-music-loop.mp3');
        //     audio.play();
        // }
        // fallBlockSound() {//âm thanh khối gạch rơi xuống
        //     const audio = new Audio('../assets/audio/263006__dermotte__giant-step-1.mp3');
        //     audio.play();
        // }
}



