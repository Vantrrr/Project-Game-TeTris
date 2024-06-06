import Game from './core/GameControler';
import Game1 from './core/GameControler';

const game1KeyConfig: KeyConfig = {
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
    UP: 'KeyW',
    DOWN: 'KeyS',
    SPACE: 'Space',
};

const game2KeyConfig: KeyConfig = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    SPACE: 'Enter',
};




new Game(game1KeyConfig);
new Game(game2KeyConfig);

