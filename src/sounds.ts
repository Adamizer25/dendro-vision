import { userPrefs } from "./usePrefs";

function playSound(sound: HTMLAudioElement) {
    if (userPrefs().audioVolume == 0 || userPrefs().audioMute) return;
    console.log("playing audio")
    //let sound = audio.cloneNode(true) as any;
    sound.volume = userPrefs().audioVolume;
    sound.currentTime = 0.05;
    sound.play();
}

type soundIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "test";
type sounds = { [key in soundIndex]: HTMLAudioElement };
const click: sounds = {
    1: new Audio("assets/static/audio/1.mp3"),
    2: new Audio("assets/static/audio/2.mp3"),
    3: new Audio("assets/static/audio/3.mp3"),
    4: new Audio("assets/static/audio/4.mp3"),
    5: new Audio("assets/static/audio/5.mp3"),
    6: new Audio("assets/static/audio/6.mp3"),
    7: new Audio("assets/static/audio/7.mp3"),
    8: new Audio("assets/static/audio/8.mp3"),
    9: new Audio("assets/static/audio/9.mp3"),
    10: new Audio("assets/static/audio/10.mp3"),
    "test": new Audio("assets/static/audio/test.mp3")
}

export const playClick = (index: soundIndex) => playSound(click[index]);