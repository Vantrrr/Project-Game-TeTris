import * as PIXI from 'pixi.js';
import GameController from './GameControler';
export default class GameView {
    private gameController: GameController;
    private app: PIXI.Application;

    constructor(gameController: GameController) {
        this.gameController = gameController;
        this.app = gameController.getApp();
        this.setupUI();
    }

    public setupUI() {
        const gameTitle = PIXI.Sprite.from('../assets/logo_tetris.png');
        gameTitle.position.set(325, 10);
        gameTitle.width = 200;
        gameTitle.height = 50;
        this.app.stage.addChild(gameTitle);

        // Text NEXT
        const nextTextStyle = new PIXI.TextStyle({
            fontFamily: 'Press Start 2P',
            fontSize: 18,
            fill: '#ffffff',
            stroke: '#ff0000',
            strokeThickness: 6,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,

        });

        const nextText = new PIXI.Text('Next:', nextTextStyle);
        nextText.position.set(310, 100);
        this.app.stage.addChild(nextText);

        // button play game
        const stage = PIXI.Sprite.from('../assets/R.png');
        stage.position.set(340, 425);
        stage.width = 175;
        stage.height = 55;
        this.app.stage.addChild(stage);
        stage.interactive = true;
        stage.buttonMode = true;
        stage.on('click', () => {
            this.gameController.handlePlayButtonClick();
            console.log("fixx ")
        });

        // button pause game
        const replay = PIXI.Sprite.from('../assets/replay.png');
        replay.position.set(340, 560);
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
        pause.position.set(333, 490);
        pause.width = 190;
        pause.height = 70;
        this.app.stage.addChild(pause);
        pause.interactive = true;
        pause.buttonMode = true;
        pause.on('click', () => {
            this.gameController.handlePauseButtonClick();
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

        const arow = PIXI.Sprite.from('../assets/arowpress.png');
        arow.position.set(50, 600);
        arow.width = 220;
        arow.height = 100;
        this.app.stage.addChild(arow);
        arow.interactive = true;
        arow.buttonMode = true;
    }

    public showGameOverScreen(): void {
        const gameOverContainer = new PIXI.Container();
        this.app.stage.addChild(gameOverContainer);
        gameOverContainer.zIndex = 2;
        const gameOverTexture = PIXI.Texture.from('../assets/gameovertetris.png');
        const gameOverSprite = new PIXI.Sprite(gameOverTexture);
        gameOverSprite.width = 560;
        gameOverSprite.height = 700;
        gameOverSprite.anchor.set(0.5);
        gameOverSprite.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
        gameOverContainer.addChild(gameOverSprite);

        const playButtonTexture = PIXI.Texture.from('../assets/R.png');
        const playButton = new PIXI.Sprite(playButtonTexture);
        playButton.anchor.set(0.5);
        playButton.position.set(275, 500);
        playButton.width = 175;
        playButton.height = 55;

        playButton.interactive = true;
        playButton.buttonMode = true;
        playButton.on('click', () => {
            location.reload();
        });

        gameOverContainer.addChild(playButton);
        this.app.stage.addChildAt(gameOverContainer, this.app.stage.children.length);
        this.app.stage.addChild(gameOverContainer);
        this.gameController.hideApp1();

    }

    public getApp(): PIXI.Application {
        return this.app;
    }
}
