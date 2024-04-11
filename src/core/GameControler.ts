import * as PIXI from 'pixi.js';
import { Board } from './Board';
import { Brick } from './Bricks';


export default class Game {
    private board: Board;
    private brick: Brick;
    public app: PIXI.Application;
    public readonly COLS: number = 10;
    public readonly ROWS: number = 20;
    public readonly BLOCK_SIZE: number = 30;
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



    constructor() {
        this.app = new PIXI.Application({ width: this.COLS * this.BLOCK_SIZE, height: this.ROWS * this.BLOCK_SIZE, backgroundColor: 0xffffff });
        window.document.body.appendChild(this.app.view);
        this.app.renderer.resize(560, 700);
        const gameTitle = PIXI.Sprite.from('../assets/logo_tetris.png');
        gameTitle.position.set(325, 10);
        gameTitle.width = 200;
        gameTitle.height = 50;
        this.app.stage.addChild(gameTitle);

        // Text NEXT
        const nextTextStyle = new PIXI.TextStyle({
            fontFamily: 'Press Start 2P',
            fontSize: 18,
            fill: '##000000',
            fontWeight: 'bold',
        });

        const nextText = new PIXI.Text('Next:', nextTextStyle);
        nextText.position.set(310, 100);
        this.app.stage.addChild(nextText);

        // Text Level
        const levelTextStyle = new PIXI.TextStyle({
            fontFamily: 'Press Start 2P',
            fontSize: 18,
            fill: '##000000',
            fontWeight: 'bold',
        });

        const levelText = new PIXI.Text('Level:', levelTextStyle);
        levelText.position.set(310, 390);
        this.app.stage.addChild(levelText);

        // Text Score
        const scoreTextStyle = new PIXI.TextStyle({
            fontFamily: 'Press Start 2P',
            fontSize: 18,
            fill: '##000000',
            fontWeight: 'bold',
        });

        const scoreText = new PIXI.Text('Scores: ', scoreTextStyle);
        scoreText.name = "scoreText";
        scoreText.position.set(310, 360);
        this.app.stage.addChild(scoreText);

        // button play game
        const stage = PIXI.Sprite.from('../assets/R.png');
        stage.position.set(340, 425);
        stage.width = 175;
        stage.height = 55;
        this.app.stage.addChild(stage);
        stage.interactive = true;
        stage.buttonMode = true;
        stage.on('click', () => {
            location.reload();
        });

        // button pause game
        const replay = PIXI.Sprite.from('../assets/replay.png');
        replay.position.set(340, 490);
        replay.width = 173
        replay.height = 60;
        this.app.stage.addChild(replay);
        replay.interactive = true;
        replay.buttonMode = true;
        replay.on('click', () => {
            location.reload();
        });
        // button pause game
        const pause = PIXI.Sprite.from('../assets/pause.png');
        pause.position.set(333, 560);
        pause.width = 190;
        pause.height = 70;
        this.app.stage.addChild(pause);
        pause.interactive = true;
        pause.buttonMode = true;
        pause.on('click', () => {
            location.reload();
        });
        //  button exit game
        const exit = PIXI.Sprite.from('../assets/exit.png');
        exit.position.set(320, 628);
        exit.width = 220;
        exit.height = 80;
        this.app.stage.addChild(exit);
        exit.interactive = true;
        exit.buttonMode = true;
        exit.on('click', () => {
            location.reload();
        });

        //  button exit game
        const arow = PIXI.Sprite.from('../assets/arow2.png');
        arow.position.set(20, 610);
        arow.width = 220;
        arow.height = 90;
        this.app.stage.addChild(arow);
        arow.interactive = true;
        arow.buttonMode = true;
        //  arow.on('click', () => {
        //      location.reload();
        //  });
        this.board = new Board(this);
        this.brick = new Brick(0, this);
        this.board.drawBoard();
        // this.generateNewBrick();
        this.brick.draw();

        setInterval(() => {
            this.brick.moveDown();
        }, 1000);
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