import { iCharacter, iCharacterJson } from "../../calculations/interfaces"

export default (json: iCharacterJson): iCharacter => {
    return {
        json,
        name: "Bennett",
        weapon: "sword",
        rarity: 4,
        el: "pyro",
        ascStat: "atk",
        ascVal: 0,
        hp: 1,
        atk: 1,
        def: 1,
        imgs: {
            splash: "https://genshin.honeyhunterworld.com/img/bennett_032_gacha_splash.webp",
            icon: "https://genshin.honeyhunterworld.com/img/bennett_032_icon.webp",
            side: "https://genshin.honeyhunterworld.com/img/bennett_032_side_icon_70.webp",
            t1: "https://genshin.honeyhunterworld.com/img/s_323101.webp",
            t2: "https://genshin.honeyhunterworld.com/img/s_323201.webp",
            t3: "https://genshin.honeyhunterworld.com/img/s_323901.webp",
            c1: "https://genshin.honeyhunterworld.com/img/c_321.webp",
            c2: "https://genshin.honeyhunterworld.com/img/c_322.webp",
            c3: "https://genshin.honeyhunterworld.com/img/c_323.webp",
            c4: "https://genshin.honeyhunterworld.com/img/c_324.webp",
            c5: "https://genshin.honeyhunterworld.com/img/c_325.webp",
            c6: "https://genshin.honeyhunterworld.com/img/c_326.webp",
        },
        efx: [],
        constellation: [
            [
                { count: 0, text: "Fantastic Voyage‘s ATK increase no longer has an HP restriction, and gains an additional 20% of Bennett’s Base ATK." }
            ],
            [
                { count: 1, text: "When Bennett’s HP falls below 70%, his Energy Recharge is increased by 30%." }
            ],
            [
                { count: 0, text: "Increases the Level of Passion Overload by 3. Maximum upgrade level is 15." }
            ],
            [
                { count: 1, text: "Using a Normal Attack when executing the second attack of Passion Overload‘s Charge Level 1 allows an additional attack to be performed. This additional attack does 135% of the second attack’s DMG." }
            ],
            [
                { count: 0, text: "Increases the Level of Fantastic Voyage by 3. Maximum upgrade level is 15." }
            ],
            [
                { count: 0, text: "Sword, Claymore, or Polearm-wielding characters inside Fantastic Voyage‘s radius gain a 15% Pyro DMG Bonus and their weapons are infused with Pyro." }
            ]
        ],
        talents: {
            auto: [],
            skill: [],
            burst: [
                { count: 1, text: "If the health of a character within the AoE is equal to or falls below 70%, their health will continuously regenerate. The amount of HP restored scales off Bennett's Max HP." },
                { count: 1, text: "If the health of a character within the AoE is higher than 70%, they gain an ATK Bonus that is based on Bennett’s Base ATK." },
                { count: 1, text: "Imbues characters within the AoE with Pyro." }
            ]
        }
    }
}