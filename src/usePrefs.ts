import createLocalStorageSignal from "./local";

let defaultPrefs: prefs = {
    theme: "dark",
    audioVolume: 0.5,
    audioMute: false
}

export type theme = "dark" | "light";
type prefs = {
    theme?: theme
    audioVolume?: number
    audioMute?: boolean
    currentTeam?: string[]
    currentCharacter?: string
    currentTab?: string
}

export const [userPrefs, setUserPrefs] = createLocalStorageSignal<prefs>('user-prefs', defaultPrefs)

export const updateTheme = (newTheme: theme) => {
    let newPrefs = userPrefs();
    newPrefs.theme = newTheme;
    setUserPrefs(newPrefs);
}
export const toggleMute = () => {
    let newPrefs = userPrefs();
    newPrefs.audioMute = !newPrefs.audioMute;
    setUserPrefs(newPrefs);
}
export const updateCurrentTeam = (newCurrentTeam: string[]) => {
    let newPrefs = userPrefs();
    newPrefs.currentTeam = newCurrentTeam;
    setUserPrefs(newPrefs);
}
export const updateCurrentChar = (newCurrentChar: string) => {
    let newPrefs = userPrefs();
    newPrefs.currentCharacter = newCurrentChar;
    setUserPrefs(newPrefs);
}
export const updateCurrentTab = (newTab: string) => {
    let newPrefs = userPrefs();
    newPrefs.currentTab = newTab;
    setUserPrefs(newPrefs);
}