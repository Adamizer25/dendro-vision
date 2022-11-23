import { effect } from "../../calculations/classes/effect";
import { stat } from "../../calculations/classes/stat";
import { weapon } from "../../calculations/classes/weapon";
import { iWeapon, iWeaponJson } from "../../calculations/interfaces";

export default function (json: iWeaponJson): iWeapon {
    return {
        name: "Wolf's Gravestone",
        json: json,
        assets: {
            tn: "https://genshin.honeyhunterworld.com/img/i_n12502.webp"
        },
        weaponType: "claymore",
        rarity: 5,
        baseAtk: 608.07,
        substatType: "atk_",
        substat: 49.62,
        weaponAffix: "Wolfish Tracker",
        affixDescription: [
            {
                i: 0,
                c: 0,
                v: `Increases ATK by ${15 + 5 * json.refinement}%.`
            },
            {
                i: 1,
                c: 1,
                v: `On hit, attacks against opponents with less than 30% HP increase all party members’ ATK by ${40 + 10 * json.refinement}% for 12s. Can only occur once every 30s.`
            }
        ],
        effects: [

        ]
    }
};