import * as PIXI from 'pixi.js';
import Game from './GameControler';
import { Brick } from './Bricks';

export class Board {
    private app: PIXI.Application;
    private app1: PIXI.Application;
    private game: Game;
    public grid: any;
    public score: number;
    private scoreUpdateCallback: () => void;

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
        this.grid = [...newRows, ...latestGrid];
        this.scoreUpdateCallback();
        //console.log("Current Score:", this.getScore());

        if (completedRows > 0) {
            this.playEatSound();
        }
    }

    calculateScore(rowsCount: number): number {

        return (rowsCount * (rowsCount + 1)) / 2 * 100;
    }

    getScore(): number {
        return this.score;
    }

    setScoreUpdateCallback(callback: () => void) {
        this.scoreUpdateCallback = callback;
    }



    playEatSound() {//âm thanh ăn điểm
            const audio = new Audio('../assets/audio/258020__kodack__arcade-bleep-sound.mp3');
            audio.play();
        }
}
export class GameController {
    saveScore(playerName: string, score: number): void {
        const playerInfo = { name: playerName, score: score };
        const existingPlayerInfoJSON = localStorage.getItem('playerInfo');
        if (existingPlayerInfoJSON) {
            const existingPlayerInfo = JSON.parse(existingPlayerInfoJSON);
            if (score > existingPlayerInfo.score) {
                localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
            }
        } else {
            localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
        }
    }

    loadHighestScore(): { name: string, score: number } | null {
        const playerInfoJSON = localStorage.getItem('playerInfo');
        if (playerInfoJSON) {
            const playerInfo = JSON.parse(playerInfoJSON);
            return playerInfo;
        } else {
            return null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gameController = new GameController();

    // Kết nối với phần tử HTML
    const saveScoreBtn = document.getElementById('save-score-btn') as HTMLButtonElement;
    const playerNameInput = document.getElementById('player-name') as HTMLInputElement;
    const highScoreName = document.getElementById('high-score-name') as HTMLSpanElement;
    const highScoreValue = document.getElementById('high-score-value') as HTMLSpanElement;

    // Xử lý sự kiện khi nhấn nút lưu điểm số
    saveScoreBtn.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (!playerName) {
            alert('Please enter your name.');
            return;
        }

        // Lưu điểm số của người chơi vào Local Storage
        const gameScore = 0; // Thay 0 bằng lấy điểm số từ trò chơi xếp gạch (nếu đã có)
        gameController.saveScore(playerName, gameScore);

        // Hiển thị điểm số cao nhất từ Local Storage
        displayHighScore();
    });

    // Hiển thị điểm số cao nhất từ Local Storage khi trang được tải
    displayHighScore();

    // Hàm để hiển thị điểm số cao nhất từ Local Storage
    function displayHighScore() {
        const highScoreInfo = gameController.loadHighestScore();
        if (highScoreInfo) {
            highScoreName.textContent = highScoreInfo.name;
            highScoreValue.textContent = highScoreInfo.score.toString();
        } else {
            highScoreName.textContent = "N/A";
            highScoreValue.textContent = "N/A";
        }
    }
});

