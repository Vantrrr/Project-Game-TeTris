import * as PIXI from "pixi.js";
import GameController from "./GameControler";
import { soundgame } from "./sound";
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
      fontSize: 18,
      fill: "#ffffff",
      stroke: "#ff0000",
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

    // button replay game
    const replay = PIXI.Sprite.from("../assets/replay.png");
    replay.position.set(310, 550);
    replay.width = 173;
    replay.height = 60;
    this.app.stage.addChild(replay);
    replay.interactive = true;
    replay.buttonMode = true;
    replay.on("click", () => {
      // location.reload();
      this.gameController.resetGame();
    });
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
    // Tạo texture từ hình ảnh chứa cả pause và resume
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

    // Tạo texture từ hình ảnh chứa cả sound on và sound off
    const combinedSoundTexture = PIXI.Texture.from("../assets/soundimage.png");
    const soundOffRect = new PIXI.Rectangle(0, 0, 1920 / 2, 960);
    const soundOnRect = new PIXI.Rectangle(1920 / 2, 0, 1920 / 2, 960);
    const soundOffTexture = new PIXI.Texture(
      combinedSoundTexture.baseTexture,
      soundOffRect
    );
    const soundOnTexture = new PIXI.Texture(
      combinedSoundTexture.baseTexture,
      soundOnRect
    );
    const soundButton = new PIXI.Sprite(soundOffTexture);
    soundButton.position.set(400, 454);
    soundButton.width = 85;
    soundButton.height = 85;
    this.app.stage.addChild(soundButton);

    soundButton.interactive = true;
    soundButton.buttonMode = true;

    soundButton.on("pointerdown", () => {
      this.isSoundOn = !this.isSoundOn;
      soundButton.texture = this.isSoundOn ? soundOffTexture : soundOnTexture;
      this.gameController.toggleSound(this.isSoundOn);
    });

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

    const bgScore = PIXI.Texture.from("../assets/bgscore.jpg");
    const score = new PIXI.Sprite(bgScore);
    score.anchor.set(0.5);
    score.position.set(275, 400);
    score.width = 300;
    score.height = 130;

    score.interactive = true;
    score.buttonMode = true;
    score.on("click", () => {
      location.reload();
    });
    gameOverContainer.addChild(score);

    const scoreTextStyle = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 24,
      fill: "#ffffff",
      fontWeight: "bold",
    });
    const scoreText = new PIXI.Text(
      localStorage.getItem("playerName") +
        " " +
        localStorage.getItem("score") +
        " điểm!",
      scoreTextStyle
    );
    scoreText.position.set(200, 370);
    gameOverContainer.addChild(scoreText);
    // Thêm nút Retry
    const retryButtonTexture = PIXI.Texture.from("../assets/retry.png");
    const retryButton = new PIXI.Sprite(retryButtonTexture);
    retryButton.anchor.set(0.5);
    retryButton.position.set(280, 550);
    retryButton.width = 190;
    retryButton.height = 70;
    retryButton.interactive = true;
    retryButton.buttonMode = true;
    this.gameController.resetGame();

    retryButton.on("click", () => {
      this.app.stage.removeChild(gameOverContainer);
      this.showGameStart();
    });
    gameOverContainer.addChild(retryButton);
    this.app.stage.removeChild(gameOverContainer);

    this.app.stage.addChildAt(
      gameOverContainer,
      this.app.stage.children.length
    );
    this.app.stage.addChild(gameOverContainer);
    this.gameController.hideApp1();
  }
  showGameStart() {
    // // Yêu cầu người chơi nhập tên
    // let playerName = prompt("Nhập tên của bạn:");
    // if (playerName) {
    //   localStorage.setItem("playerName", playerName);
    // }
    // Create the player name input
    const playerNameInput = document.createElement("input");
    playerNameInput.id = "playerNameInput";
    playerNameInput.type = "text";
    playerNameInput.placeholder = "Nhập tên của bạn";
    playerNameInput.style.position = "absolute";
    playerNameInput.style.left = "665px";
    playerNameInput.style.top = "370px";
    playerNameInput.style.width = "200px";
    playerNameInput.style.padding = "10px";

    playerNameInput.addEventListener("input", (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        const playerName = event.target.value;
        localStorage.setItem("playerName", playerName);
      }
    });
    document.body.appendChild(playerNameInput);

    this.gameController.hideApp1();
    const startScreen = new PIXI.Container();
    this.app.stage.addChild(startScreen);

    const backgroundTexture = PIXI.Texture.from("../assets/startttt.png");
    const backgroundSprite = new PIXI.Sprite(backgroundTexture);
    backgroundSprite.width = 560;
    backgroundSprite.height = 700;
    startScreen.addChild(backgroundSprite);

    const playButton = PIXI.Sprite.from("../assets/R.png");
    playButton.position.set(190, 400);
    playButton.width = 173;
    playButton.height = 60;
    this.app.stage.addChild(playButton);

    playButton.interactive = true;
    playButton.buttonMode = true;

    this.gameController.pauseGame();

    playButton.on("pointerdown", () => {
      this.app.stage.removeChild(startScreen);
      document.body.removeChild(playerNameInput);
      this.gameController.resumeGame();
      this.gameController.showApp1();
    });

    startScreen.addChild(playButton);
  }
  public getApp(): PIXI.Application {
    return this.app;
  }
}
