import { iStatCollection, iEffectCollection } from "../interfaces";
import { weaponType, rarity, elementType, statType } from "../types";
import { effect } from "./effect";
import { stat } from "./stat";

export class character implements iStatCollection, iEffectCollection {
    imgs: any;
    name: string;
    weaponType: weaponType;
    level: number;
    rarity: rarity;
    element: elementType;
    ascensionStat: stat;
    baseHp: stat;
    baseAtk: stat;
    baseDef: stat;
    critRate: stat = new stat("critRate_", 5);
    critDmg: stat = new stat("critDMG_", 50);
    ascensionPassives: effect[];
    constructor(imgs: any, name: string, weaponType: weaponType, rarity: rarity, level: number, element: elementType, ascensionStatType: statType, ascensionStat: number, baseHp: number, baseAtk: number, baseDef: number, ...ascensionPassives: effect[]) {
        this.imgs = imgs;
        this.name = name;
        this.weaponType = weaponType;
        this.rarity = rarity;
        this.level = level;
        this.element = element;
        this.ascensionStat = new stat(ascensionStatType, ascensionStat);
        this.baseHp = new stat("hp", baseHp);
        this.baseAtk = new stat("atk", baseAtk);
        this.baseDef = new stat("def", baseDef);
        this.ascensionPassives = ascensionPassives;
    }
    get effects(): effect[] {
        return this.ascensionPassives;
    }
    getStat(statType: statType): number {
        let foundStat = [this.ascensionStat, this.baseHp, this.baseAtk, this.baseDef].find(s => s.type === statType);
        return foundStat?.value || 0;
    }
}