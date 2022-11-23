import { iWeaponJson, iWeapon } from "../../../calculations/interfaces";

export default function (json: iWeaponJson): iWeapon {
    return {
        name: "Dull Blade",
        json: json,
        assets: {
            tn: "static/weapons/sword/dull_blade.webp"
        },
        weaponType: "sword",
        rarity: 1,
        baseAtk: 23.25
    }
};
