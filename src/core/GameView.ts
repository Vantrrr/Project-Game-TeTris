import * as PIXI from 'pixi.js';

export default class GameView {
    private app: PIXI.Application;

    constructor() {
        this.app = new PIXI.Application({ width: 560, height: 700, backgroundColor: 0xffffff });
        window.document.body.appendChild(this.app.view);

        this.createUI();
    }

    private createUI() {
        const gameTitle = PIXI.Sprite.from('../assets/logo_tetris.png');
        gameTitle.position.set(325, 10);
        gameTitle.width = 200;
        gameTitle.height = 50;
        this.app.stage.addChild(gameTitle);

        // Add other UI elements here...
    }

    public getApp(): PIXI.Application {
        return this.app;
    }
}
