import * as PIXI from 'pixi.js';
import Game from './GameControler';
import { Brick } from './Bricks';
import { playEatSound } from './sound';

export class Board {
    private app: PIXI.Application;
    private app1: PIXI.Application;
    private game: Game;
    public grid: any;
    public score: number;
    public completedLines: number = 0;

    boardContainerApp: PIXI.Container<PIXI.DisplayObject>;
    boardContainerApp1: PIXI.Container<PIXI.DisplayObject>;

    constructor(game: Game) {
        this.game = game;
        this.drawApp();
        this.drawApp1();
        this.score = 0;
    }

    drawApp() {
        this.app = this.game.getApp();
        this.boardContainerApp = new PIXI.Container();
        this.app.stage.addChild(this.boardContainerApp);
        this.grid = this.generateWhiteBoard();
    }

    drawApp1() {
        this.app1 = this.game.getApp1();
        this.boardContainerApp1 = new PIXI.Container();
        this.app1.stage.addChild(this.boardContainerApp1);
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

        this.boardContainerApp.addChild(cellGraphics);
    }

    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }

    drawCellNextApp1(xAxis: number, yAxis: number, colorID: number) {
        const cellGraphics = new PIXI.Graphics();
        const x = xAxis * this.game.nextBLOCK_SIZE;
        const y = yAxis * this.game.nextBLOCK_SIZE;
        const size = this.game.nextBLOCK_SIZE;
        const borderSize = 0.5;
        const color = this.game.COLOR_MAPPING[colorID];

        // Vẽ viền
        cellGraphics.lineStyle(borderSize, 0x000000, 1);
        cellGraphics.drawRect(x, y, size, size);

        // Vẽ màu nền
        cellGraphics.beginFill(colorID);
        cellGraphics.drawRect(x + borderSize, y + borderSize, size - 2 * borderSize, size - 2 * borderSize);
        cellGraphics.endFill();

        this.boardContainerApp1.addChild(cellGraphics);
    }


    drawBoardNextApp1() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCellNextApp1(col, row, this.grid[row][col]);
            }
        }
    }

    resetBoardNextApp1() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.grid[row][col] = this.game.WHITE_COLOR_ID;
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
        this.updateScoreDisplay();
        this.grid = [...newRows, ...latestGrid];
        this.scoreUpdateCallback();
        if (completedRows > 0) {
            playEatSound();
        }
        this.completedLines += completedRows;
        this.updateCompletedLinesDisplay();
    }


    countCompletedRows(): number {
        let completedRows = 0;
        for (let row = 0; row < this.grid.length; row++) {
            const isCompleted = this.grid[row].every((col: number) => col !== this.game.WHITE_COLOR_ID);
            if (isCompleted) {
                completedRows++;
            }
          
    updateCompletedLinesDisplay() {
        let completedLinesText = this.game.getApp().stage.getChildByName('completedLinesText') as PIXI.Text;
        if (completedLinesText) {
            completedLinesText.text = 'Lines: ' + this.completedLines;
        } else {
            const completedLinesTextStyle = new PIXI.TextStyle({
                fontFamily: 'Press Start 2P',
                fontSize: 18,
                fill: '#000000',
                fontWeight: 'bold',
            });
            completedLinesText = new PIXI.Text('Lines: ' + this.completedLines, completedLinesTextStyle);
            completedLinesText.name = 'completedLinesText';
            completedLinesText.position.set(310, 350);
            this.game.getApp().stage.addChild(completedLinesText);

        }
    }

    displayCompletedRows(): void {
        const completedRows = this.countCompletedRows();
        console.log("Completed Rows:", completedRows);
    }


    calculateScore(rowsCount: number): number {
        return (rowsCount * (rowsCount + 1)) / 2 * 100;
    }

    updateScoreDisplay() {
        let scoreText = this.game.getApp().stage.getChildByName('scoreText') as PIXI.Text;
        if (scoreText) {
            scoreText.text = 'Score: ' + this.score;
        } else {
            const scoreTextStyle = new PIXI.TextStyle({
                fontFamily: 'Press Start 2P',
                fontSize: 18,
                fill: '#000000',
                fontWeight: 'bold',
            });
            scoreText = new PIXI.Text('Score: ' + this.score, scoreTextStyle);
            scoreText.name = 'scoreText';
            scoreText.position.set(310, 380);
            this.game.getApp().stage.addChild(scoreText);
        }
    }

    getScore(): number {
        return this.score;
    }



    playEatSound() {
        const audio = new Audio('../assets/audio/258020__kodack__arcade-bleep-sound.mp3');
        audio.play();
    }

}
