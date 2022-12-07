export const playAudio = (src) => {
    const audio = new Audio(src);
    audio.volume = 0.2;
    audio.play();
}