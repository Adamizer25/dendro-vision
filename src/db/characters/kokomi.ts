import { character } from "../../calculations/classes/character";
import { effect } from "../../calculations/classes/effect";
import { stat } from "../../calculations/classes/stat";
import { team } from "../../calculations/classes/team";
import { iCharacter, iCharacterJson } from "../../calculations/interfaces";
import { condition, reward } from "../../calculations/types";

// Court of Dancing Petals
let buff = effect.selfishBuff(
    new stat("heal_", 25),
    new stat("critRate_", -100)
);
let rew: reward = (team: team, i: number) => {
    const slot = team.slots[i];
    let healingBonus = slot.character.getStat("heal_") + slot.weapon.getStat("heal_");
    return [new stat("norm_", healingBonus * .15), new stat("charge_", healingBonus * .15)];
};

export default (json: iCharacterJson): iCharacter => {
    return {
        json,
        name: "Sangonomiya_Kokomi",
        weapon: "catalyst",
        rarity: 5,
        el: "hydro",
        ascStat: "hydro_dmg_",
        ascVal: 28.8,
        hp: 13471,
        atk: 234.39,
        def: 657.11,
        imgs: {
            splash: "https://genshin.honeyhunterworld.com/img/kokomi_054_gacha_splash.webp",
            icon: "https://genshin.honeyhunterworld.com/img/kokomi_054_icon.webp",
        },
        efx: [
            effect.permanent(buff),
            effect.onParam("Nereid's Ascension", rew)
        ],
        constellation: [],
        talents: {
            auto: [],
            skill: [],
            burst: []
        }
    }
}
