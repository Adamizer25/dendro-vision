import { character } from "../../calculations/classes/character";
import { effect } from "../../calculations/classes/effect";
import { stat } from "../../calculations/classes/stat";
import { team } from "../../calculations/classes/team";
import { iCharacter, iCharacterJson } from "../../calculations/interfaces";

// Court of Dancing Petals
let con = (team: team) => {
    // are all units dendro or hydro?
    let dendroOrHydro = true;
    for (let slot of team.slots) {
        dendroOrHydro = slot.character.element == ("dendro" || "hydro");
        if (!dendroOrHydro) break;
    }
    team.parameters.getParam("Golden Chalice's Bounty");
    return dendroOrHydro;
};
let rew = (team: team) => {
    let active = team.parameters.getParam("<10s after hit by Dendro attack");
    return active ? [new stat("eleMas", 100)] : [];
};

export default (json: iCharacterJson): iCharacter => {
    return {
        json,
        name: "Nilou",
        weapon: "sword",
        rarity: 5,
        el: "hydro",
        ascStat: "hp_",
        ascVal: 28.8,
        hp: 15185,
        atk: 229.61,
        def: 728.59,
        imgs: {
            splash: "https://genshin.honeyhunterworld.com/img/nilou_070_gacha_splash.webp",
            icon: "https://genshin.honeyhunterworld.com/img/nilou_070_icon.webp",
            side: "static/characters/nilou/side_icon.webp",
            t1: "https://genshin.honeyhunterworld.com/img/s_703101.webp",
            t2: "https://genshin.honeyhunterworld.com/img/s_703201.webp",
            t3: "https://genshin.honeyhunterworld.com/img/s_703901.webp",
            c1: "https://genshin.honeyhunterworld.com/img/c_701.webp",
            c2: "https://genshin.honeyhunterworld.com/img/c_702.webp",
            c3: "https://genshin.honeyhunterworld.com/img/c_703.webp",
            c4: "https://genshin.honeyhunterworld.com/img/c_704.webp",
            c5: "https://genshin.honeyhunterworld.com/img/c_705.webp",
            c6: "https://genshin.honeyhunterworld.com/img/c_706.webp",
        },
        efx: [new effect(con, rew)],
        constellation: [
            [
                { count: 1, text: "Dance of Haftkarsvar will be enhanced as follows: Luminous Illusion DMG is increased by 65%. The Tranquility Aura’s duration is extended by 6s." },
            ],
            [
                { count: 1, text: "After characters affected by the Golden Chalice’s Bounty deal Hydro DMG to an opponent, that opponent’s Hydro RES will be decreased by 35% for 10s." },
                { count: 1, text: "After a triggered Bloom reaction deals DMG to opponents, their Dendro RES will be decreased by 35% for 10s." },
            ],
            [
                { count: 0, text: "Increases the Level of Dance of Abzendegi: Distant Dreams, Listening Spring by 3. Maximum upgrade level is 15." }
            ],
            [
                { count: 1, text: "After the third dance step of Dance of Haftkarsvar‘s Pirouette hits opponents, Nilou will gain 15 Elemental Energy, and DMG from her Dance of Abzendegi: Distant Dreams, Listening Spring will be increased by 50% for 8s." }
            ],
            [
                { count: 0, text: "Increases the Level of Dance of Haftkarsvar by 3. Maximum upgrade level is 15." }
            ],
            [
                { count: 1, text: "For every 1,000 points of Max HP, Nilou’s CRIT Rate and CRIT DMG will increase by 0.6% and 1.2% respectively. The maximum increase in CRIT Rate and CRIT DMG via this method is 30% and 60% respectively." }
            ]
        ],
        talents: {
            auto: [],
            skill: [],
            burst: []
        }
    }
}