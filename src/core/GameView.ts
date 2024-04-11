import * as PIXI from 'pixi.js';
import { Constants } from './Constants';

export class GameView {
    private app: PIXI.Application;
    private constants: Constants;

    constructor() {
        this.constants = new Constants();
        this.app = new PIXI.Application({
            width: this.constants.COLS * this.constants.BLOCK_SIZE,
            height: this.constants.ROWS * this.constants.BLOCK_SIZE,
            backgroundColor: 0xffffff
        });
        this.setupUI();

        window.document.body.appendChild(this.app.view);
    }

    private setupUI() {
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
    }

    public getApp(): PIXI.Application {
        return this.app;
    }
}
