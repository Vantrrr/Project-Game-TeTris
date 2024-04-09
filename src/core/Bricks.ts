import { Constants } from './Constants';
import Game from "./Game";
import { Board } from './Board';

export class Brick {
    private game: Game;
    private board: Board;
    private constants: Constants;
    private landed: boolean;

    id: number;
    layout: any;
    activeIndex: number;
    colPos: number;
    rowPos: number;

    constructor(id: number, game: Game) {
        this.id = id;
        this.game = game;
        this.constants = new Constants();
        this.board = new Board(this.game);
        this.layout = this.constants.getBrickLayout()[id];
        this.activeIndex = 0;
        this.colPos = 3;
        this.rowPos = 3;
        this.landed = false;
    }

    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== this.constants.WHITE_COLOR_ID) {
                    this.board.drawCell(col + this.colPos, row + this.rowPos, this.constants.COLOR_MAPPING[this.id]);
                }
            }
        }
    }

    clearIndexFirst() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== this.constants.WHITE_COLOR_ID) {
                    this.board.drawCell(col + this.colPos, row + this.rowPos, this.constants.WHITE_COLOR_ID);
                }
            }
        }
    }

    moveLeft() {
        if (!this.landed && !this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])) {
            this.clearIndexFirst();
            this.colPos--;
            this.draw();
        }
    }

    moveRight() {
        if (!this.landed && !this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])) {
            this.clearIndexFirst();
            this.colPos++;
            this.draw();
        }
    }

    moveDown() {
        if (!this.landed && this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.handleLanded();
            this.landed = true;
        } else if (!this.landed) {
            this.clearIndexFirst();
            this.rowPos++;
            this.draw();
        }
    }

    rotate() {
        if (!this.landed && !this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
            this.clearIndexFirst();
            this.activeIndex = (this.activeIndex + 1) % 4;
            this.draw();
        }
    }

    checkCollision(nextRow: number, nextCol: number, nextLayout: any) {
        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[row].length; col++) {
                if (nextLayout[row][col] !== this.constants.WHITE_COLOR_ID) {
                    if ((col + nextCol < 0) || (col + nextCol >= this.constants.COLS) || (row + nextRow >= this.constants.ROWS)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    handleLanded() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== this.constants.WHITE_COLOR_ID) {
                    this.board.grid[row + this.rowPos][col + this.colPos] = this.constants.COLOR_MAPPING[this.id];
                }
            }
        }

        this.board.drawBoard();
    }

    generateNewBrick() {
        // Tạo một viên gạch mới ở đây
    }
}