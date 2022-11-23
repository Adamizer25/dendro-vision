import { effect } from "../../calculations/classes/effect";
import { stat } from "../../calculations/classes/stat";
import { iWeaponBase } from "../../calculations/interfaces";

let val: iWeaponBase = {
    name: "Primordial Jade Cutter",
    weaponType: "sword",
    rarity: 5,
    affixDescription: (i) => `${i}`,
    baseAtk: 541.83,
    substatType: "critDMG_",
    substat: 44.1,
    passives: [
        effect.permanent((team, i) => {
            const refinement = team.slots[i].weapon.refinement;
            let hp = 15 + 5 * refinement;
            return [new stat("hp_", hp)];
        }),
        effect.permanent((team, i) => {
            const slot = team.slots[i];
            const refinement = slot.weapon.refinement;
            let percentOfHp = 0.009 + 0.003 * refinement;
            // gives em to the team based on the character's max hp
            // % hp
            let hpBonusFromGear = slot.artifacts.getStat("hp_") + slot.character.getStat("hp_") + slot.weapon.getStat("hp_");
            let hpBonusFromEffects = team.getStatFromEffects("hp_", i);
            const hpBonus = hpBonusFromGear + hpBonusFromEffects;

            // flat hp
            let flatHpFromGear = slot.artifacts.getStat("hp") + slot.character.getStat("hp") + slot.weapon.getStat("hp");
            let flatHpFromEffects = team.getStatFromEffects("hp", i);
            const flatHp = flatHpFromGear + flatHpFromEffects;

            const characterMaxHP = slot.character.baseHp.value * (100 + hpBonus) / 100 + flatHp;
            return [new stat("atk", characterMaxHP * percentOfHp)];
        })
    ]
};
export default val;