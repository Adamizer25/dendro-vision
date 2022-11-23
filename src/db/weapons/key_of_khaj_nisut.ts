import { effect } from "../../calculations/classes/effect";
import { stat } from "../../calculations/classes/stat";
import { iWeapon, iWeaponJson } from "../../calculations/interfaces";

export default function (json: iWeaponJson): iWeapon {
    return {
        name: "Key of Khaj-Nisut",
        json: json,
        assets: {
            tn: "https://genshin.honeyhunterworld.com/img/i_n11511.webp"
        },
        weaponType: "sword",
        rarity: 5,
        baseAtk: 474.55,
        substatType: "hp_",
        substat: 66.15,
        weaponAffix: "Sunken Song of the Sands",
        affixDescription: [
            {
                i: 0,
                c: 0,
                v: `HP increased by ${15 + 5 * json.refinement}%.`
            },
            {
                i: 1,
                c: 3,
                v: `When an Elemental Skill hits opponents, you gain the Grand Hymn effect for 20s. This effect increases the equipping character's Elemental Mastery by ${0.09 + 0.03 * json.refinement}% of their Max HP. This effect can trigger once every 0.3s. Max 3 stacks.`
            },
            {
                i: 2,
                c: 1,
                v: `When this effect gains 3 stacks, or when the third stack's duration is refreshed, the Elemental Mastery of all nearby party members will be increased by ${(0.15 + 0.05 * json.refinement).toFixed(2)}% of the equipping character's max HP for 20s.`
            }
        ],
        effects: [
            effect.permanent((team, i) => {
                let hp = 15 + 5 * json.refinement;
                return [new stat("hp_", hp)];
            }),
            effect.onParam("bloom", (team, i) => {
                let partOfHp = 0.0015 + 0.0005 * json.refinement;
                // gives em to the team based on the character's max hp
                const slot = team.slots[i];
                // % hp
                let hpBonusFromGear = slot.artifacts.getStat("hp_") + slot.character.getStat("hp_") + slot.weapon.getStat("hp_");
                let hpBonusFromEffects = team.getStatFromEffects("hp_", i);
                const hpBonus = hpBonusFromGear + hpBonusFromEffects;

                // flat hp
                let flatHpFromGear = slot.artifacts.getStat("hp") + slot.character.getStat("hp") + slot.weapon.getStat("hp");
                let flatHpFromEffects = team.getStatFromEffects("hp", i);
                const flatHp = flatHpFromGear + flatHpFromEffects;

                const characterMaxHP = slot.character.baseHp.value * (100 + hpBonus) / 100 + flatHp;
                return [new stat("eleMas", characterMaxHP * partOfHp)];
            })
        ]
    }
};