import { effect } from "../../calculations/classes/effect";
import { stat } from "../../calculations/classes/stat";
import { weapon } from "../../calculations/classes/weapon";
import { iWeapon, iWeaponJson } from "../../calculations/interfaces";

export default function (json: iWeaponJson): iWeapon {
    return {
        name: "Aquila Favonia",
        json: json,
        assets: {
            tn: "https://genshin.honeyhunterworld.com/img/i_n11501.webp"
        },
        weaponType: "sword",
        rarity: 5,
        baseAtk: 674.33,
        substatType: "physical_dmg_",
        substat: 41.35,
        weaponAffix: "Falcon's Defiance",
        affixDescription: [
            {
                i: 0,
                c: 0,
                v: `HP increased by ${15 + 5 * json.refinement}%.`
            },
            {
                i: 1,
                c: 1,
                v: `Triggers on taking DMG: the soul of the Falcon of the West awakens, holding the banner of resistance aloft, regenerating HP equal to ${100 + 15 * json.refinement}% of ATK and dealing ${200 + 30 * json.refinement}% of ATK as DMG to surrounding opponents. This effect can only occur once every 15s.`
            }
        ],
        effects: []
    }
};