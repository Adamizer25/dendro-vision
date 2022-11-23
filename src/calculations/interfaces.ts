import { effect } from "./classes/effect";
import { artifactLevel, artifactSlotType, elementType, mainStatType, rarity, statType, subStatType, weaponType } from "./types";

export interface iStatCollection {
    getStat(statType: statType): number
}
export interface iEffectCollection {
    get effects(): effect[]
}
export interface iCharacterJson {
    key: string
    level: number
    constellation: number
    ascension: number
    talent: {
        auto: number
        skill: number
        burst: number
    }
}
export interface iCharacter {
    json: iCharacterJson
    name: string
    weapon: weaponType
    rarity: number
    el: elementType,
    ascStat: statType,
    ascVal: number
    hp: number
    atk: number
    def: number
    imgs: {
        splash: string
        icon: string
        side?: string
        t1?: string
        t2?: string
        t3?: string
        c1?: string
        c2?: string
        c3?: string
        c4?: string
        c5?: string
        c6?: string
    },
    efx: effect[]
    constellation: { count: number, text: string }[][];
    talents: {
        auto: { count: number, text: string }[]
        skill: { count: number, text: string }[]
        burst: { count: number, text: string }[]
    }
}
export interface iWeaponJson {
    key: string
    level: number
    ascension: number
    refinement: 1
    location: string
    lock: boolean
    id: number
}

interface affixDescription { i: number, c: number, v: string }
export interface iWeapon {
    name: string
    json: any
    baseAtk: number
    weaponType: weaponType
    rarity: number
    assets: {
        tn: string
    }
    weaponAffix?: string
    affixDescription?: affixDescription[]
    substatType?: statType
    substat?: number
    effects?: effect[]
}
export interface iArtifactJson {
    id: number
    rarity: rarity
    level: artifactLevel
    mainStatKey: mainStatType
    slotKey: artifactSlotType
    setKey: string
    substats: {
        key: subStatType
        value: number
    }[]
    location: string
    lock: boolean
}