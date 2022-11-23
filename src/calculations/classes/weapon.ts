import { iStatCollection, iEffectCollection, iWeaponBase } from "../interfaces";
import { refinement, statType, weaponType } from "../types";
import { effect } from "./effect";
import { stat } from "./stat";

export class weapon implements iStatCollection, iEffectCollection {
    name: string;
    weaponType: weaponType;
    rarity: number;
    baseAtk: stat;
    substat: stat;
    passives: effect[];
    refinement: refinement;
    constructor(weapon: iWeaponBase, refinement: refinement = 1) {
        this.name = weapon.name;
        this.rarity = weapon.rarity;
        this.weaponType = weapon.weaponType;
        this.baseAtk = new stat("atk", weapon.baseAtk);
        this.substat = new stat(weapon.substatType, weapon.substat);
        this.passives = weapon.passives;
        this.refinement = refinement;
    }
    get effects(): effect[] {
        return this.passives;
    }
    getStat(statType: statType): number {
        let foundStat = [this.baseAtk, this.substat].find(s => s.type === statType);
        return foundStat?.value || 0;
    }
}