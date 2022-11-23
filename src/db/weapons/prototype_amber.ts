import { iWeaponBase } from "../../calculations/interfaces";

let val: iWeaponBase = {
    name: "Prototype Amber",
    weaponType: "catalyst",
    rarity: 4,
    affixDescription: (i) => `${i}`,
    baseAtk: 509.61,
    substatType: "hp_",
    substat: 41.35,
    passives: []
};
export default val;