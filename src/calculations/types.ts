import { stat } from "./classes/stat";
import { team } from "./classes/team";

export type kvp<T1, T2> = { [key: string]: (json: T1) => T2 }
export type subStatType = ("critRate_" | "critDMG_" | "atk" | "hp" | "def" | "atk_" | "hp_" | "def_" | "eleMas" | "enerRech_");
export type elementalDamageType = ("anemo_dmg_" | "cryo_dmg_" | "dendro_dmg_" | "electro_dmg_" | "geo_dmg_" | "hydro_dmg_" | "pyro_dmg_" | "physical_dmg_");
export type mainStatType = ("critRate_" | "critDMG_" | "atk" | "hp" | "atk_" | "hp_" | "def_" | "eleMas" | "enerRech_" | "heal_" | elementalDamageType)
export type statType = (mainStatType | subStatType | "norm_" | "charge_" | "eleBurst_" | "eleSkl_");
export type elementType = "anemo" | "cryo" | "dendro" | "electro" | "geo" | "hydro" | "pyro";
export type weaponType = "sword" | "claymore" | "catalyst" | "polearm" | "bow";
export type rarity = 1 | 2 | 3 | 4 | 5;
export type refinement = 1 | 2 | 3 | 4 | 5;
export type condition = (team: team, index: number) => boolean;
export type reward = (team: team, index: number) => stat[];
export type _reward = (team: team, index: number, opts?: any) => stat[];
export type setsArray = { setName: string, count: number }[];
export type parameter = { [key: string]: boolean };
export type scalingDescription = (i: rarity) => string;
export type artifactSlotType = "flower" | "plume" | "sands" | "goblet" | "circlet";
export type artifactLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type statMap<T1 extends string, T2> = { [key in T1]: T2; };