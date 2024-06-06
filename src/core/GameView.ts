import * as PIXI from "pixi.js";
import GameController from "./GameControler";
// import Game1 from "./Game1";
export default class GameView {
  private gameController: GameController;
  private app: PIXI.Application;
  public isSoundOn: boolean;

  constructor(gameController: GameController) {
    this.gameController = gameController;
    this.app = gameController.getApp();
    this.setupUI();
    this.isSoundOn = true;
  }

  public setupUI() {
    const gameTitle = PIXI.Sprite.from("../assets/logo_tetris.png");
    gameTitle.position.set(315, 10);
    gameTitle.width = 200;
    gameTitle.height = 50;
    this.app.stage.addChild(gameTitle);

    // Text NEXT
    const nextTextStyle = new PIXI.TextStyle({
      fontFamily: "Press Start 2P",
      fontSize: 22,
      fill: "#ffffff",
      stroke: "#333333",
      strokeThickness: 6,
      dropShadow: true,
      dropShadowColor: "#000000",
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });

    const nextText = new PIXI.Text("Next:", nextTextStyle);
    nextText.position.set(310, 90);
    this.app.stage.addChild(nextText);

    // Button Replay Game
    const replay = PIXI.Sprite.from("../assets/replay.png");
    replay.position.set(310, 550);
    replay.width = 173;
    replay.height = 60;
    this.app.stage.addChild(replay);
    replay.interactive = true;
    replay.buttonMode = true;
    replay.on("click", () => {
      this.gameController.resetGame();
    });

    // Button Exit Game
    const exit = PIXI.Sprite.from("../assets/exit.png");
    exit.position.set(285, 620);
    exit.width = 230;
    exit.height = 80;
    this.app.stage.addChild(exit);
    exit.interactive = true;
    exit.buttonMode = true;
    exit.on("click", () => {
      window.close();
    });

    // Tạo texture pause và resume
    const combinedTexture = PIXI.Texture.from("../assets/pauseresume.png");
    const pauseRect = new PIXI.Rectangle(200, 0, 200, 400);
    const resumeRect = new PIXI.Rectangle(0, 0, 200, 400);
    const pauseTexture = new PIXI.Texture(
      combinedTexture.baseTexture,
      pauseRect
    );
    const resumeTexture = new PIXI.Texture(
      combinedTexture.baseTexture,
      resumeRect
    );
    const pauseButton = new PIXI.Sprite(pauseTexture);
    pauseButton.position.set(310, 430);
    pauseButton.width = 70;
    pauseButton.height = 140;
    this.app.stage.addChild(pauseButton);
    pauseButton.interactive = true;
    pauseButton.buttonMode = true;
    pauseButton.on("click", () => {
      this.gameController.handlePauseButtonClick();
      pauseButton.texture = this.gameController.isPaused
        ? resumeTexture
        : pauseTexture;
    });


    // Image keyboard 
    const arow = PIXI.Sprite.from("../assets/arowpress.png");
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
    const gameOverTexture = PIXI.Texture.from("../assets/gameovertetris.png");
    const gameOverSprite = new PIXI.Sprite(gameOverTexture);
    gameOverSprite.width = 560;
    gameOverSprite.height = 700;
    gameOverSprite.anchor.set(0.5);
    gameOverSprite.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2
    );
    gameOverContainer.addChild(gameOverSprite);

    // Background score
    const bgScore = PIXI.Texture.from("../assets/wooden.webp");
    const score = new PIXI.Sprite(bgScore);
    score.anchor.set(0.5);
    score.position.set(260, 400);
    score.width = 270;
    score.height = 200;
    score.interactive = true;
    score.buttonMode = true;
    score.on("click", () => {
      location.reload();
    });
    gameOverContainer.addChild(score);

    // Text display score
    const scoreTextStyle = new PIXI.TextStyle({
      fontFamily: "Press Start 2P",
      fontSize: 13,
      fill: "#ffffff",
      fontWeight: "bold",
      stroke: "#333333",
      strokeThickness: 6,
      dropShadow: true,
      dropShadowColor: "#000000",
      dropShadowBlur: 4,
    });

    const scores: number[] = JSON.parse(localStorage.getItem("scores") || "[]");
    scores.forEach((score, index) => {
      const scoreText = new PIXI.Text(`Game ${index + 1}: ${score}`, scoreTextStyle);
      scoreText.position.set(180, 330 + index * 30);
      gameOverContainer.addChild(scoreText);
    });


    this.gameController.pauseGame();

    // Button Retry
    const retryButtonTexture = PIXI.Texture.from("../assets/retry.png");
    const retryButton = new PIXI.Sprite(retryButtonTexture);
    retryButton.anchor.set(0.5);
    retryButton.position.set(190, 550);
    retryButton.width = 180;
    retryButton.height = 70;
    retryButton.interactive = true;
    retryButton.buttonMode = true;
    this.gameController.resetGame();
    retryButton.on("click", () => {
      this.app.stage.removeChild(gameOverContainer);
      this.showGameStart();
    });
    gameOverContainer.addChild(retryButton);

    // Button Exit
    const exitButtonTexture = PIXI.Texture.from("../assets/exit.png");
    const exitButton = new PIXI.Sprite(exitButtonTexture);
    exitButton.anchor.set(0.5);
    exitButton.position.set(360, 550);
    exitButton.width = 190;
    exitButton.height = 70;
    exitButton.interactive = true;
    exitButton.buttonMode = true;
    exitButton.on("click", () => {
      window.close();
    });
    gameOverContainer.addChild(exitButton);

    this.app.stage.addChildAt(
      gameOverContainer,
      this.app.stage.children.length
    );
    this.app.stage.addChild(gameOverContainer);
    this.gameController.hideApp1();
  }

  showGameStart() {
    this.gameController.hideApp1();
    const startScreen = new PIXI.Container();
    this.app.stage.addChild(startScreen);

    const backgroundTexture = PIXI.Texture.from("../assets/startttt.png");
    const backgroundSprite = new PIXI.Sprite(backgroundTexture);
    backgroundSprite.width = 560;
    backgroundSprite.height = 700;
    startScreen.addChild(backgroundSprite);

    const logoGame = PIXI.Sprite.from("../assets/Tetris_logo.png");
    logoGame.position.set(200, 80);
    logoGame.width = 173;
    logoGame.height = 60;
    this.app.stage.addChild(logoGame);
    startScreen.addChild(logoGame);

    const playButton = PIXI.Sprite.from("../assets/R.png");
    playButton.position.set(200, 370);
    playButton.width = 173;
    playButton.height = 60;
    this.app.stage.addChild(playButton);
    playButton.interactive = true;
    playButton.buttonMode = true;
    this.gameController.pauseGame();

    playButton.on("click", () => {
      this.app.stage.removeChild(startScreen);
      this.gameController.showApp1();
      this.gameController.resumeGame();
    });
    startScreen.addChild(playButton);


  }

  public getApp(): PIXI.Application {
    return this.app;
  }
}