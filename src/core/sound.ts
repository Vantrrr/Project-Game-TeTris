
let isGameOverSoundPlaying = false;
export function rotateSound() {
    const audio = new Audio('../assets/audio/rotate.mp3');
    audio.play();
}
export function fallFastSound() {
    const audio = new Audio('../assets/audio/movefastdown.wav');
    audio.play();
}
export function fallBlockSound() {
    const audio = new Audio('../assets/audio/263006__dermotte__giant-step-1.mp3');
    audio.play();
}
export function playEatSound() {
    const audio = new Audio('../assets/audio/258020__kodack__arcade-bleep-sound.mp3');
    audio.play();
}
export function gameOverSound() {
    if (!isGameOverSoundPlaying) {
        const audio = new Audio('../assets/audio/gameover.mp3');
        isGameOverSoundPlaying = true;
        audio.play();
        audio.onended = () => {
            isGameOverSoundPlaying = false;
        };
    }
}


