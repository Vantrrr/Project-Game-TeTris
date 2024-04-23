import { Board } from './Board';
import Game from './GameControler';
import GameView from './GameView';
export class Brick {
    private game: Game;
    private board: Board;
    private isCurrentBrickLanded: boolean;
    private gameView: GameView;
    public id: number;
    public layout: any;
    public activeIndex: number;
    public colPos: number;
    public rowPos: number;
    public nextcolPos: number;
    public nextrowPos: number;
    public isLanded: boolean;
    public gameOver: any;


    constructor(id: number, game: Game) {
        this.id = id;
        this.game = game;
        this.layout = this.game.getBrickLayout()[id];
        this.activeIndex = 0;
        this.colPos = 4;
        this.rowPos = -1;
        this.nextcolPos = 1;
        this.nextrowPos = 1;
        this.board = this.game.getBoard();
        this.isLanded = false;
        this.isCurrentBrickLanded = false;
        this.gameOver = false;
    }

    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== this.game.WHITE_COLOR_ID) {
                    this.board.drawCell(col + this.colPos, row + this.rowPos, this.game.COLOR_MAPPING[this.id]);
                }
            }
        }
    }

    drawNextBrick() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== this.game.WHITE_COLOR_ID) {
                    this.board.drawCellNextApp1(col + this.nextcolPos, row + this.nextrowPos, this.game.COLOR_MAPPING[this.id]);
                }
            }
        }
    }

    clear() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== this.game.WHITE_COLOR_ID) {
                    this.board.drawCell(col + this.colPos, row + this.rowPos, this.game.WHITE_COLOR_ID);
                }
            }
        }
    }

    clearNextBrick() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== this.game.WHITE_COLOR_ID) {
                    this.board.drawCellNextApp1(col + this.nextcolPos, row + this.nextrowPos, this.game.WHITE_COLOR_ID);
                }
            }
        }
    }

    moveLeft() {
        if (this.isLanded) {
            return;
        }

        if (
            !this.checkCollision(
                this.rowPos,
                this.colPos - 1,
                this.layout[this.activeIndex]
            )
        ) {
            this.clear();
            this.colPos--;
            this.draw();
        }
    }

    moveRight() {
        if (this.isLanded) {
            return;
        }

        if (
            !this.checkCollision(
                this.rowPos,
                this.colPos + 1,
                this.layout[this.activeIndex]
            )
        ) {
            this.clear();
            this.colPos++;
            this.draw();
        }
    }

    moveDown() {
        if (this.isLanded) {
            return;
        }
        if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPos++;
            // this.fallBlockSound();
            this.draw();
        } else {
            this.handleLanded();
            this.isCurrentBrickLanded = true;
            this.game.generateNewBrick();
        }
    }



    fixPosition(nextRow: number, nextCol: number, nextLayout: any) {
        this.rowPos = nextRow - 1;
        this.draw();
        if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPos++;
            this.draw();
        } else {
            this.handleLanded();
            this.isCurrentBrickLanded = true;
            this.game.generateNewBrick();
        }
    }

    rotate() {
        if (this.isLanded) {
            return;
        }
        if (!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;
            this.draw();
            this.rotateSound();
        }
    }
    rotateSound() {
        const audio = new Audio('../assets/audio/rotate.mp3');
        audio.play();
    }

    fallFastSound() {
        const audio = new Audio('../assets/audio/263006__dermotte__giant-step-1.mp3');
        audio.play();
    }
    fallBlockSound() {
        const audio = new Audio('../assets/audio/263006__dermotte__giant-step-1.mp3');
        audio.play();
    }

    checkCollision(nextRow: number, nextCol: number, nextLayout: any) {
        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[row].length; col++) {
                if (nextLayout[row][col] !== this.game.WHITE_COLOR_ID && nextRow >= 0) {
                    const boardRow = row + nextRow;
                    const boardCol = col + nextCol;

                    if (
                        boardCol < 0 ||
                        boardCol >= this.game.COLS ||
                        boardRow >= this.game.ROWS ||
                        this.board.grid[boardRow][boardCol] !== this.game.WHITE_COLOR_ID
                    ) {
                        if (nextRow > this.rowPos) {
                            this.isLanded = true;
                        }
                        return true;
                    }
                }
            }
        }
        return false;
    }

    handleLanded() {
        if (this.rowPos <= 0) {
            this.game.handleGameOver();
            return;
        }
        if (!this.isCurrentBrickLanded) {
            for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
                for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                    if (this.layout[this.activeIndex][row][col] !== this.game.WHITE_COLOR_ID) {
                        this.board.grid[row + this.rowPos][col + this.colPos] = this.game.COLOR_MAPPING[this.id];
                    }
                }
            }
            this.board.handleCompletRows();
            this.board.drawBoard();
        }
    }
    gameoversound() {
        const audio = new Audio('../assets/audio/gameover.mp3');
        audio.play();
    }
} 