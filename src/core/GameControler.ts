import * as PIXI from 'pixi.js';
import { Board } from './Board';
import { Brick } from './Bricks';
import GameView from './GameView';
import { fallBlockSound, fallFastSound  } from './sound';
export default class GameController {
    private gameView: GameView;
    private board: Board;
    private brick: Brick;
    public app: PIXI.Application;
    public app1: PIXI.Application;
    public readonly COLS: number = 10;
    public readonly ROWS: number = 20;
    public readonly BLOCK_SIZE: number = 30;

    // NextBrick
    public readonly nextCOLS: number = 6;
    public readonly nextROWS: number = 5;
    public readonly nextBLOCK_SIZE: number = 25;
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

    nextBrick: Brick;

    constructor() {

        this.app = new PIXI.Application({ width: this.COLS * this.BLOCK_SIZE, height: this.ROWS * this.BLOCK_SIZE, backgroundColor: 0xffffff });
        window.document.body.appendChild(this.app.view);

        this.app1 = new PIXI.Application({ width: this.nextCOLS * this.nextBLOCK_SIZE, height: this.nextROWS * this.nextBLOCK_SIZE, backgroundColor: 0xFFA500 });
        window.document.body.appendChild(this.app1.view);
        
        this.app1.view.classList.add('my-app1');
        const style = document.createElement('style');
        style.innerHTML = `
            .my-app1 {
                touch-action: none;
                cursor: inherit;
                position: absolute;
                left: 810px;
                top: 149px;
                z-index: 0;
            }
        `;
        document.head.appendChild(style);
        this.app.renderer.resize(560, 700);
        this.board = new Board(this);
        // this.brick = new Brick(this.generateNextBrick()
        this.nextBrick = new Brick(0, this);
        this.board.drawBoard();
        this.board.drawBoardNextApp1();
        this.level_Update();
        this.startGame();
        this.keyboard();
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
            this.handlePlayButtonClick();
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
            this.handlePauseButtonClick();
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
    private handlePlayButtonClick() {
        this.startGame();
    }

    private handlePauseButtonClick() {
        this.pauseGame();
    }

    private handleExitButtonClick() {
        this.exitGame();
    }
    startGame() {
        this.brickDropInterval = setInterval(() => {
            this.brick.moveDown();
            this.generateNextBrick();
            this.updateLevelAndSpeed();
            this.board.updateCompletedLinesDisplay();
            this.board.updateScoreDisplay();

        }, this.baseDropInterval);
    }
    


    public pauseGame() {
        if (this.brickDropInterval) {
            clearInterval(this.brickDropInterval);
            this.brickDropInterval = null;
        }
    }

    public exitGame() {
        // Code xử lý kết thúc trò chơi
    }
    private hideApp1(): void {
        if (this.app1 && this.app1.view) {
        // Ẩn view của app1 bằng cách sử dụng CSS
        this.app1.view.style.visibility = 'hidden';
        }
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
        this.hideApp1();

        }
    updateLevelAndSpeed() {
        if (this.board.score >= this.level * this.levelThreshold) {
            this.level++;
            this.adjustDropSpeed();
            // console.log('Level:', this.level);
            // console.log('score:', this.board.score);

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
        this.baseDropInterval -= 50;
        // console.log('Drop Speed:', this.baseDropInterval);
    }
    keyboard() {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            switch (e.code) {
                case this.KEY_CODES.LEFT:
                    this.brick.moveLeft();
                    break;
                case this.KEY_CODES.RIGHT:
                    this.brick.moveRight();
                    break;
                case this.KEY_CODES.UP:
                    this.brick.rotate();
                    break;
                case this.KEY_CODES.DOWN:
                    this.brick.moveDown();
                    fallBlockSound();
                    break;
                case this.KEY_CODES.SPACE:
                    this.brickDropInstantly();
                    break;

            }
        });
    }
    brickDropInstantly() {
        // Move the brick down instantly
        while (!this.brick.checkCollision(this.brick.rowPos + 1, this.brick.colPos, this.brick.layout[this.brick.activeIndex])) {
            this.brick.moveDown();
        }
        const nextRow = this.brick.rowPos + 1;
        const nextCol = this.brick.colPos;
        const nextLayout = this.brick.layout[this.brick.activeIndex];
        this.brick.fixPosition(nextRow, nextCol, nextLayout);
        fallFastSound();
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
        LevelText.position.set(310, 320);
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

    public getApp1(): PIXI.Application {
        return this.app1;
    }

    public getBoard() {
        return this.board;
    }

    public getBrickLayout() {
        return this.BRICK_LAYOUT;
    }


    generateNewBrick() {
        // Nếu đã có viên gạch tiếp theo, hãy đặt nó làm viên gạch hiện tại
        if (this.nextBrick) {
            this.brick = this.nextBrick;
        } else {
            // Nếu không, tạo một viên gạch mới
            this.brick = new Brick(Math.floor(Math.random() * 10) % this.BRICK_LAYOUT.length, this);
        }

        // Tạo viên gạch tiếp theo
        this.generateNextBrick();

    }

    generateNextBrick() {
        // Xóa viên gạch tiếp theo cũ
        if (this.nextBrick) {
            this.nextBrick.clearNextBrick();
        }
        // Tạo ra ID ngẫu nhiên cho viên gạch tiếp theo
        let nextBrickId = Math.floor(Math.random() * 10) % this.BRICK_LAYOUT.length;

        // Lưu trữ viên gạch tiếp theo
        this.nextBrick = new Brick(nextBrickId, this);

        // Vẽ viên gạch tiếp theo
        this.nextBrick.drawNextBrick();
        
    }


} 