import { statType } from "./types";

export const label: { [key in statType]: string } = {
    critRate_: "CRIT Rate",
    critDMG_: "CRIT DMG",
    atk: "ATK",
    hp: "HP",
    def: "DEF",
    atk_: "ATK",
    hp_: "HP",
    def_: "DEF",
    eleMas: "Elemental Mastery",
    enerRech_: "Energy Recharge",
    heal_: "Healing Bonus",
    anemo_dmg_: "Anemo DMG Bonus",
    cryo_dmg_: "Cryo DMG Bonus",
    dendro_dmg_: "Dendro DMG Bonus",
    electro_dmg_: "Electro DMG Bonus",
    geo_dmg_: "Geo DMG Bonus",
    hydro_dmg_: "Hydro DMG Bonus",
    pyro_dmg_: "Pyro DMG Bonus",
    physical_dmg_: "Physical DMG Bonus",
    norm_: "Normal Attack DMG Bonus",
    charge_: "Charged Attack DMG Bonus",
    eleBurst_: "Elemental Burst DMG Bonus",
    eleSkl_: "Elemental Skill DMG Bonus"
}