import { iCharacter, iCharacterJson } from "../../calculations/interfaces"

export default (json: iCharacterJson): iCharacter => {
    return {
        json,
        name: "Venti",
        weapon: "bow",
        rarity: 5,
        el: "anemo",
        ascStat: "atk",
        ascVal: 0,
        hp: 1,
        atk: 1,
        def: 1,
        imgs: {
            splash: "https://genshin.honeyhunterworld.com/img/venti_022_gacha_splash.webp",
            icon: "https://genshin.honeyhunterworld.com/img/venti_022_icon.webp",
            side: "https://genshin.honeyhunterworld.com/img/venti_022_side_icon.webp"
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