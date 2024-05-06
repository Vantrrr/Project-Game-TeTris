let isGameOverSoundPlaying = false;
export function rotateSound() {
  //âm thanh xoay khối gạch
  const audio = new Audio("../assets/audio/rotate.mp3");
  audio.play();
  return audio;
}
export function fallFastSound() {
  //âm thanh khối gạch rơi nhanh
  const audio = new Audio("../assets/audio/movefastdown.wav");
  audio.play();
  return audio;
}
export function fallBlockSound() {
  //âm thanh khối gạch rơi xuống
  const audio = new Audio("../assets/audio/263006__dermotte__giant-step-1.mp3");
  audio.play();
  return audio;
}
export function playEatSound() {
  //âm thanh ăn điểm
  const audio = new Audio(
    "../assets/audio/258020__kodack__arcade-bleep-sound.mp3"
  );
  audio.play();
  return audio;
}
export function gameoversound() {
  if (!isGameOverSoundPlaying) {
    const audio = new Audio("../assets/audio/game-over-160612.mp3");
    isGameOverSoundPlaying = true;
    audio.play();
    // Khi âm thanh kết thúc, đặt lại cờ
    audio.onended = () => {
      isGameOverSoundPlaying = false;
    };
    return audio;
  }
}
export function soundgame() {
  const audio = new Audio("../assets/audio/soundgame.mp3");
  // audio.play();
  return audio;
}
