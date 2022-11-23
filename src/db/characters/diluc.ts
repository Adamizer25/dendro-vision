import { iCharacterJson, iCharacter } from "../../calculations/interfaces";

export default (json: iCharacterJson): iCharacter => {
    return {
        json,
        name: "Diluc",
        weapon: "claymore",
        rarity: 5,
        el: "pyro",
        ascStat: "critRate_",
        ascVal: 28.8,
        hp: 11362,//13471,
        atk: 234.39,
        def: 657.11,
        imgs: {
            splash: "https://genshin.honeyhunterworld.com/img/diluc_016_gacha_splash.webp",
            icon: "https://genshin.honeyhunterworld.com/img/diluc_016_icon.webp",
            side: "https://genshin.honeyhunterworld.com/img/diluc_016_side_icon_70.webp"
        },
        efx: [],
        constellation: [],
        talents: {
            auto: [],
            skill: [],
            burst: []
        }
    }
}