import { effect } from "./classes/effect";
import { stat } from "./classes/stat";
import { elementType, condition, reward, _reward } from "./types";

let doubleResonance = (element: elementType): condition => {
    return (team) => {
        let elementUnits = team.slots.filter(s => s.character.element === element);
        return elementUnits.length >= 2;
    }
}
let doubleResonanceBonus = (element: elementType, stats: stat[]): _reward => {
    return (team, i) => team.slots[i].character.element === element ? stats : [];
}

export let hydro = new effect(
    doubleResonance("hydro"),
    doubleResonanceBonus("hydro", [new stat("hp_", 25)])
);
export let dendro = new effect(
    doubleResonance("dendro"),
    doubleResonanceBonus("dendro", [])
);