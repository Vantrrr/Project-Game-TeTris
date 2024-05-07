let isGameOverSoundPlaying = false;
export function rotateSound() {
  const audio = new Audio("../assets/audio/rotate.mp3");
  audio.play();
  return audio;
}
export function fallFastSound() {
  const audio = new Audio("../assets/audio/movefastdown.wav");
  audio.play();
  return audio;
}
export function fallBlockSound() {
  const audio = new Audio("../assets/audio/263006__dermotte__giant-step-1.mp3");
  audio.play();
  return audio;
}
export function playEatSound() {
  const audio = new Audio(
    "../assets/audio/258020__kodack__arcade-bleep-sound.mp3"
  );
  audio.play();
  return audio;
}
export function gameOverSound() {
  if (!isGameOverSoundPlaying) {
    const audio = new Audio("../assets/audio/game-over-160612.mp3");
    isGameOverSoundPlaying = true;
    audio.play();
    audio.onended = () => {
      isGameOverSoundPlaying = false;
    };
    return audio;
  }
}
export function soundGame() {
  const audio = new Audio("../assets/audio/soundame.mp3");
  // audio.play();
  return audio;
}


