import * as PIXI from 'pixi.js';
import { Board } from './Board';
import { Brick } from './Bricks';
import GameView from './GameView';
export default class Game {
    private gameView: GameView;
    private board: Board;
    private brick: Brick;
    public app: PIXI.Application;
    public readonly COLS: number = 10;
    public readonly ROWS: number = 20;
    public readonly BLOCK_SIZE: number = 30;

    // NextBrick
    public readonly nextCOLS: number = 6;
    public readonly nextROWS: number = 5;
    public readonly nextBLOCK_SIZE: number = 10;
    public readonly COLOR_MAPPING = [
        0xFF0000, // red
        0xFFA500, // orange
        0x00FF00, // green
        0x800080, // purple
        0x0000FF, // blue
        0x00FFFF, // cyan
        0xFFFF00, // yellow
        0xFFFFFF, // white
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
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [1, 1, 1, 1],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [1, 1, 1, 1],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
        ],
        [
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
            ],
            [
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], 1, 1, this.COLOR_MAPPING[7]],
                [this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7], this.COLOR_MAPPING[7]],
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
        'LEFT': 'ArrowLeft',
        'UP': 'ArrowUp',
        'RIGHT': 'ArrowRight',
        'DOWN': 'ArrowDown',
        'SPACE': 'Space',
        'ENTER': 'Enter',
    }

    public level: number = 0;
    public levelThreshold: number = 500;
    public baseDropInterval: number = 800;
    private brickDropInterval: NodeJS.Timeout | null = null;
    constructor() {
        this.gameView = new GameView(this.COLS, this.ROWS, this.BLOCK_SIZE);
        this.app = this.gameView.getApp();
        this.board = new Board(this);
        this.brick = new Brick(0, this);
        this.board.drawBoard();
        this.brick.draw();
        this.score_Update();
        this.level_Update();
        this.startGame();
    }

    startGame() {
        this.brickDropInterval = setInterval(() => {
            this.brick.moveDown();
            this.updateLevelAndSpeed();
        }, this.baseDropInterval);
    }

    updateLevelAndSpeed() {
        if (this.board.score >= this.level * this.levelThreshold) {
            this.level++;
            this.adjustDropSpeed();
            console.log('Level:', this.level);
            console.log('score:', this.board.score);

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
        this.baseDropInterval -= 100;
        console.log('Drop Speed:', this.baseDropInterval);
    }

    score_Update() {
        const scoreTextStyle = new PIXI.TextStyle({
            fontFamily: 'Press Start 2P',
            fontSize: 18,
            fill: '##000000',
            fontWeight: 'bold',
        });
        const scoreText = new PIXI.Text('Scores:' + this.board.getScore(), scoreTextStyle);
        scoreText.name = "scoreText";
        scoreText.position.set(310, 360);
        this.app.stage.addChild(scoreText);
        const updateScoreText = () => {
            scoreText.text = 'Scores:' + this.board.getScore();
        };
        this.board.setScoreUpdateCallback(updateScoreText);
    }

    level_Update() {
        const LevelTextStyle = new PIXI.TextStyle({
            fontFamily: 'Press Start 2P',
            fontSize: 18,
            fill: '##000000',
            fontWeight: 'bold',
        });
        const LevelText = new PIXI.Text('Level:' + this.level, LevelTextStyle);
        LevelText.name = "LEVEL";
        LevelText.position.set(310, 400);
        this.app.stage.addChild(LevelText);
    }
    updateLevelDisplay() {
        const levelText = this.app.stage.getChildByName("LEVEL") as PIXI.Text;
        if (levelText) {
            levelText.text = 'Level: ' + this.level;
        }
    }
    public getApp(): PIXI.Application {
        return this.app;
    }

    public getBoard() {
        return this.board;
    }

    public getBrickLayout() {
        return this.BRICK_LAYOUT;
    }

    public generateNewBrick() {
        this.brick = new Brick(Math.floor(Math.random() * 10) % this.BRICK_LAYOUT.length, this);
    }
} 