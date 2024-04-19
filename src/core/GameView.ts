import * as PIXI from 'pixi.js';
import GameController from './GameControler';
export default class GameView {
    private gameController: GameController;
    private app: PIXI.Application;

    constructor(gameController: GameController) {
        this.app = new PIXI.Application({ width: this.gameController.COLS * this.gameController.BLOCK_SIZE, height: this.gameController.ROWS * this.gameController.BLOCK_SIZE, backgroundColor: 0xffffff });
        window.document.body.appendChild(this.app.view);
        this.app.renderer.resize(560, 700);
        this.gameController = gameController;
        this.app = gameController.getApp();
        this.setupUI();
    }

    private setupUI() {
        const gameTitle = PIXI.Sprite.from('../assets/logo_tetris.png');
        gameTitle.position.set(325, 10);
        gameTitle.width = 200;
        gameTitle.height = 50;
        this.app.stage.addChild(gameTitle);
    }

    public getApp(): PIXI.Application {
        return this.app;
    }
}
