import * as PIXI from "pixi.js";
import { Board } from "./Board";
import { Brick } from "./Bricks";
import GameView from "./GameView";
import { fallBlockSound, fallFastSound, gameoversound } from "./sound";
export default class GameController {
  private gameView: GameView;
  private board: Board;
  private brick: Brick;
  public app: PIXI.Application;
  public app1: PIXI.Application;
  public readonly COLS: number = 10;
  public readonly ROWS: number = 20;
  public readonly BLOCK_SIZE: number = 30;

  // NextBrick
  public readonly nextCOLS: number = 6;
  public readonly nextROWS: number = 5;
  public readonly nextBLOCK_SIZE: number = 25;
  public isPaused: boolean = false;
  public readonly COLOR_MAPPING = [
    0xff0000, // red
    0xffa500, // orange
    0x00ff00, // green
    0x800080, // purple
    0x0000ff, // blue
    0x00ffff, // cyan
    0xffff00, // yellow
    0xffffff, // white
  ];
  public readonly WHITE_COLOR_ID = this.COLOR_MAPPING[7];
  public readonly BRICK_LAYOUT = [
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
  public readonly KEY_CODES = {
    LEFT: "ArrowLeft",
    UP: "ArrowUp",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
    SPACE: "Space",
    ENTER: "Enter",
  };

  public level: number = 0;
  public levelThreshold: number = 500;
  public baseDropInterval: number = 800;
  private brickDropInterval: NodeJS.Timeout | null = null;
  private nextBrick: Brick | null;
  constructor() {
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
    const style = document.createElement("style");
    style.innerHTML = `
            .my-app1 {
                touch-action: none;
                cursor: inherit;
                position: absolute;
                left: 835px;
                top: 149px;
                z-index: 0;
            }
        `;
    document.head.appendChild(style);
    this.app.renderer.resize(530, 700);
    this.gameView = new GameView(this);
    this.board = new Board(this);
    this.brick = new Brick(this.random(this.BRICK_LAYOUT.length), this);
    this.board.drawBoard();
    this.board.drawBoardNextApp1();
    this.level_Update();
    this.startGame();
    this.keyboard();
    this.gameView.showGameStart();
    this.generateNextBrick();
  }

  private random(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  public handlePlayButtonClick() {
    this.startGame();
  }
  public handlePauseButtonClick() {
    if (!this.isPaused) {
      this.pauseGame();
      this.isPaused = true;
    } else {
      this.resumeGame();
      this.isPaused = false;
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
    // Đặt lại trạng thái của viên gạch và bắt đầu trò chơi mới
    this.brick = new Brick(this.random(this.BRICK_LAYOUT.length), this);
    this.nextBrick = null;
    this.board.drawBoard();
    this.board.drawBoardNextApp1();
    this.updateLevelDisplay();
    this.startGame();
    this.showApp1();
  }
  clearBoard(): void {
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS; col++) {
        this.board.grid[row][col] = this.WHITE_COLOR_ID;
      }
    }
    this.board.drawBoard();
  }

  startGame() {
    //  let playerName: string | null = prompt("Nhập tên của bạn:");
    // if (playerName) {
    //     localStorage.setItem('playerName', playerName);
    // }
    this.brickDropInterval = setInterval(() => {
      this.brick.moveDown();
      this.generateNextBrick();
      this.updateLevelAndSpeed();
      this.board.updateCompletedLinesDisplay();
      this.board.updateScoreDisplay();
    }, this.baseDropInterval);
  }
  public pauseGame() {
    if (this.brickDropInterval) {
      clearInterval(this.brickDropInterval);
      this.brickDropInterval = null;
    }
  }
  public resumeGame() {
    if (!this.brickDropInterval) {
      this.brickDropInterval = setInterval(() => {
        this.brick.moveDown();
        this.updateLevelAndSpeed();
        this.board.updateCompletedLinesDisplay();
        this.board.updateScoreDisplay();
      }, this.baseDropInterval);
    }
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
  adjustDropSpeed() {
    this.baseDropInterval -= 50;
  }
  keyboard() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      switch (e.code) {
        case this.KEY_CODES.LEFT:
          this.brick.moveLeft();
          break;
        case this.KEY_CODES.RIGHT:
          this.brick.moveRight();
          break;
        case this.KEY_CODES.UP:
          this.brick.rotate();
          break;
        case this.KEY_CODES.DOWN:
          this.brick.moveDown();
          fallBlockSound();
          break;
        case this.KEY_CODES.SPACE:
          this.brickDropInstantly();
          break;
      }
    });
  }
  brickDropInstantly() {
    // Move the brick down instantly
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

  handleGameOver() {
    this.brick.gameOver = true;
    this.gameView.showGameOverScreen();
    gameoversound();
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
}
