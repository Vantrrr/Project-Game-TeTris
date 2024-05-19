import * as PIXI from "pixi.js";
import { Board } from "./Board";
import { Brick } from "./Bricks";
import GameView from "./GameView";
import { fallBlockSound, fallFastSound, gameOverSound, soundGame } from "./sound";

export default class GameController {
    private gameView: GameView;
    private board: Board;
    private brick: Brick;
    public app: PIXI.Application;
    public app1: PIXI.Application;
    public app2: PIXI.Application;
    public COLS: number = 10;
    public ROWS: number = 20;
    public BLOCK_SIZE: number = 30;
    public nextCOLS: number = 6;
    public nextROWS: number = 5;
    public nextBLOCK_SIZE: number = 25;
    public COLOR_MAPPING = [
        0xff0000, // red
        0xffa500, // orange
        0x00ff00, // green
        0x800080, // purple
        0x0000ff, // blue
        0x00ffff, // cyan
        0xffff00, // yellow
        0xffffff, // white
    ];
    public WHITE_COLOR_ID = this.COLOR_MAPPING[7];
    public BRICK_LAYOUT = [
        [
            [
                [1, this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [1, 1, 1],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], 1, 1],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [1, 1, 1],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], 1],
            ],
            [
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [1, 1, this.COLOR_MAPPING[7]],
            ],
        ],
        [
            [
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [1, 1, 1],
                [1, this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
            [
                [1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], 1],
                [1, 1, 1],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
        ],
        [
            [
                [1, this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], 1, 1],
                [1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], 1],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1],
                [1, 1, this.COLOR_MAPPING[7]],
            ],
        ],
        [
            [
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [1, 1, this.COLOR_MAPPING[7]],
                [1, this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
            [
                [1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], 1],
                [this.COLOR_MAPPING[7], 1, 1],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1],
            ],
        ],
        [
            [
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
                [1, 1, 1, 1],
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
            ],
            [
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    1,
                    this.COLOR_MAPPING[7],
                ],
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    1,
                    this.COLOR_MAPPING[7],
                ],
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    1,
                    this.COLOR_MAPPING[7],
                ],
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    1,
                    this.COLOR_MAPPING[7],
                ],
            ],
            [
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
                [1, 1, 1, 1],
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
            ],
            [
                [
                    this.COLOR_MAPPING[7],
                    1,
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
                [
                    this.COLOR_MAPPING[7],
                    1,
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
                [
                    this.COLOR_MAPPING[7],
                    1,
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
                [
                    this.COLOR_MAPPING[7],
                    1,
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
            ],
        ],
        [
            [
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
            ],
            [
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
            ],
            [
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
            ],
            [
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                    this.COLOR_MAPPING[7],
                ],
            ],
        ],
        [
            [
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [1, 1, 1],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [1, 1, 1],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
            ],
        ],
    ];
    // public KEY_CODES = {
    //     LEFT: "ArrowLeft",
    //     UP: "ArrowUp",
    //     RIGHT: "ArrowRight",
    //     DOWN: "ArrowDown",
    //     SPACE: "Space",
    //     ENTER: "Enter",
    // };
    public level: number = 0;
    public levelThreshold: number = 500;
    public baseDropInterval: number = 1000;
    private brickDropInterval: NodeJS.Timeout | null = null;
    private nextBrick: Brick | null;
    public isPaused: boolean = false;
    private audio: HTMLAudioElement;
    keyConfig: KeyConfig;

    constructor(keyConfig: KeyConfig) {
        this.keyConfig = keyConfig;
        this.app = new PIXI.Application({
            width: this.COLS * this.BLOCK_SIZE,
            height: this.ROWS * this.BLOCK_SIZE,
            backgroundColor: 0xffffff,
        });
        window.document.body.appendChild(this.app.view);

        this.app1 = new PIXI.Application({
            width: this.nextCOLS * this.nextBLOCK_SIZE,
            height: this.nextROWS * this.nextBLOCK_SIZE,
            backgroundColor: 0xffa500,
        });
        window.document.body.appendChild(this.app1.view);
        this.app1.view.classList.add("my-app1");
        this.app.renderer.resize(530, 700);

        this.gameView = new GameView(this);
        this.board = new Board(this);
        this.board.drawBoard();
        this.board.drawBoardNextApp1();
        this.board.drawBoardNextApp1();
        this.generateNewBrick();
        this.startGame();
        this.level_Update();
        this.generateNextBrick();
        this.keyboard();
        this.audio = soundGame();
        this.audio.play();
        this.gameView.showGameStart();
    }

    startGame() {
        this.brickDropInterval = setInterval(() => {
            this.brick.moveDown();
            this.generateNextBrick();
            this.updateLevelAndSpeed();
            this.board.updateCompletedLinesDisplay();
            this.board.updateScoreDisplay();
        }, this.baseDropInterval);
    }
    public pauseGame() {
        this.isPaused = true;
        if (this.brickDropInterval) {
            clearInterval(this.brickDropInterval);
            this.brickDropInterval = null;
        }
    }
    public resumeGame() {
        this.isPaused = false;
        if (!this.brickDropInterval) {
            this.brickDropInterval = setInterval(() => {
                this.brick.moveDown();
                this.updateLevelAndSpeed();
                this.board.updateCompletedLinesDisplay();
                this.board.updateScoreDisplay();
            }, this.baseDropInterval);
        }
    }
    resetGame() {
        if (this.brickDropInterval) {
            clearInterval(this.brickDropInterval);
            this.brickDropInterval = null;
        }
        this.clearBoard();
        this.board.clearBoardNextApp1();
        this.board.score = 0;
        this.level = 0;
        this.baseDropInterval = 800;

        const levelText = this.app.stage.getChildByName("LEVEL");
        if (levelText) {
            this.app.stage.removeChild(levelText);
        }
        this.level_Update();
        this.generateNewBrick();
        this.nextBrick = null;
        this.board.drawBoard();
        this.board.drawBoardNextApp1();
        this.updateLevelDisplay();
        this.startGame();
        this.showApp1();
    }
    handleGameOver() {
        this.brick.gameOver = true;
        this.board.saveScore();
        this.gameView.showGameOverScreen();
        gameOverSound();
        this.pauseGame();

    }
    clearBoard(): void {
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
                this.board.grid[row][col] = this.WHITE_COLOR_ID;
            }
        }
        this.board.drawBoard();
    }
    public hideApp1(): void {
        if (this.app1 && this.app1.view) {
            this.app1.view.style.visibility = "hidden";
        }
    }
    public showApp1(): void {
        if (this.app1 && this.app1.view) {
            this.app1.view.style.visibility = "visible";
        }
    }

    keyboard() {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (!this.brick.gameOver && !this.isPaused) {
                switch (e.code) {
                    case this.keyConfig.LEFT:
                        this.brick.moveLeft();
                        fallBlockSound();
                        break;
                    case this.keyConfig.RIGHT:
                        this.brick.moveRight();
                        fallBlockSound();
                        break;
                    case this.keyConfig.UP:
                        this.brick.rotate();
                        break;
                    case this.keyConfig.DOWN:
                        this.brick.moveDown();
                        fallBlockSound();
                        break;
                    case this.keyConfig.SPACE:
                        this.brickDropInstantly();
                        break;
                }
            }
        });
    }

    // keyboard() {
    //     document.addEventListener("keydown", (e: KeyboardEvent) => {
    //         if (!this.brick.gameOver && !this.isPaused) {
    //             switch (e.code) {
    //                 case this.KEY_CODES.LEFT:
    //                     this.brick.moveLeft();
    //                     fallBlockSound();
    //                     break;
    //                 case this.KEY_CODES.RIGHT:
    //                     this.brick.moveRight();
    //                     fallBlockSound();
    //                     break;
    //                 case this.KEY_CODES.UP:
    //                     this.brick.rotate();
    //                     break;
    //                 case this.KEY_CODES.DOWN:
    //                     this.brick.moveDown();
    //                     fallBlockSound();
    //                     break;
    //                 case this.KEY_CODES.SPACE:
    //                     this.brickDropInstantly();
    //                     break;
    //             }
    //         }
    //     });
    // }

    brickDropInstantly() {
        while (
            !this.brick.checkCollision(
                this.brick.rowPos + 1,
                this.brick.colPos,
                this.brick.layout[this.brick.activeIndex]
            )
        ) {
            this.brick.moveDown();
        }
        const nextRow = this.brick.rowPos + 1;
        const nextCol = this.brick.colPos;
        const nextLayout = this.brick.layout[this.brick.activeIndex];
        this.brick.fixPosition(nextRow, nextCol, nextLayout);
        fallFastSound();
    }

    adjustDropSpeed() {
        this.baseDropInterval -= 50;
    }
    updateLevelAndSpeed() {
        if (this.board.score >= this.level * this.levelThreshold) {
            this.level++;
            this.adjustDropSpeed();
            this.updateLevelDisplay();
            if (this.brickDropInterval) {
                clearInterval(this.brickDropInterval);
            }
            this.brickDropInterval = setInterval(() => {
                this.brick.moveDown();
                this.updateLevelAndSpeed();
            }, this.baseDropInterval);
        }
    }

    level_Update() {
        const LevelTextStyle = new PIXI.TextStyle({
            fontFamily: "Press Start 2P",
            fontSize: 18,
            fill: "#000000",
            fontWeight: "bold",
            stroke: "#ffffff",
            strokeThickness: 3,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        });
        const LevelText = new PIXI.Text("Level:" + this.level, LevelTextStyle);
        LevelText.name = "LEVEL";
        LevelText.position.set(310, 320);
        this.app.stage.addChild(LevelText);
    }
    updateLevelDisplay() {
        const levelText = this.app.stage.getChildByName("LEVEL") as PIXI.Text;
        if (levelText) {
            levelText.text = "Level: " + this.level;
        }
    }
    generateNewBrick() {
        if (this.nextBrick) {
            this.brick = this.nextBrick;
        } else {
            this.brick = new Brick(
                Math.floor(Math.random() * 10) % this.BRICK_LAYOUT.length,
                this
            );
        }
        this.generateNextBrick();
    }
    generateNextBrick() {
        if (this.nextBrick) {
            this.nextBrick.clearNextBrick();
        }
        let nextBrickId = Math.floor(Math.random() * 10) % this.BRICK_LAYOUT.length;
        this.nextBrick = new Brick(nextBrickId, this);
        this.nextBrick.drawNextBrick();
    }

    public handlePlayButtonClick() {
        this.startGame();
    }
    public handlePauseButtonClick() {
        if (!this.isPaused) {
            this.pauseGame();
            this.audio.pause();
            this.isPaused = true;
            this.gameView.isSoundOn = false;
        } else {
            this.resumeGame();
            this.audio.play();
            this.isPaused = false;
            this.gameView.isSoundOn = true;
        }
    }
    public toggleSound(isSoundOn: boolean) {
        if (isSoundOn) {
            this.audio.play();
        } else {
            this.audio.pause();
        }
    }

    public getApp(): PIXI.Application {
        return this.app;
    }
    public getApp1(): PIXI.Application {
        return this.app1;
    }
    public getBoard() {
        return this.board;
    }
    public getBrickLayout() {
        return this.BRICK_LAYOUT;
    }

}