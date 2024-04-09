import * as PIXI from 'pixi.js';
import { Constants } from './Constants';
import { Board } from './Board';
import { Brick } from './Bricks';

export default class Game {
    private constants: Constants;
    private board: Board;
    private brick: Brick;
    private app: PIXI.Application;
    private app1: PIXI.Application;
    constructor() {
        this.constants = new Constants();
        this.app = this.constants.app;
        this.app = new PIXI.Application({
            width: this.constants.COLS * this.constants.BLOCK_SIZE,
            height: this.constants.ROWS * this.constants.BLOCK_SIZE,
            backgroundColor: 0xffffff
        });
        // vẽ logo game
        this.app = new PIXI.Application({ width: 560, height: 700, backgroundColor: 0xFFFFFF });
        document.body.appendChild(this.app.view);
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

        window.document.body.appendChild(this.app.view);
        this.board = new Board(this);
        this.brick = new Brick(0, this);
        this.board.drawBoard();
        // this.generateNewBrick();
        this.brick.draw();

        setInterval(() => {
            this.brick.moveDown();
        }, 1000);
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            console.log({ e });
            switch (e.code) {
                case this.constants.KEY_CODES.LEFT:
                    this.brick.moveLeft();
                    break;
                case this.constants.KEY_CODES.RIGHT:
                    this.brick.moveRight();
                    break;
                case this.constants.KEY_CODES.UP:
                    this.brick.rotate();
                    break;
                case this.constants.KEY_CODES.DOWN:
                    this.brick.moveDown();
                    break;

            }
        });
    }

    public getApp(): PIXI.Application {
        return this.app;
    }

    generateNewBrick() {
        this.brick = new Brick(Math.floor(Math.random() * 10) % this.constants.BRICK_LAYOUT.length, this);
    }


}