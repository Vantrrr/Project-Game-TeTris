import * as PIXI from 'pixi.js';
export default class GameView {
    private app: PIXI.Application;

    constructor(cols: number, rows: number, blockSize: number,) {
        this.app = new PIXI.Application({ width: cols * blockSize, height: rows * blockSize, backgroundColor: 0xFFFFFF });
        window.document.body.appendChild(this.app.view);
        this.app.renderer.resize(560, 700);
        this.setupUI();
    }

    private setupUI() {
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
    }

    public getApp(): PIXI.Application {
        return this.app;
    }
}
