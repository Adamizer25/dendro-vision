type db = {
    [key: string]: {
        icons: { [key: string]: string; },
        text: {
            name: string,
            setBonuses: { count: number, desc: string }[]
        }
    }
}

export default {
    ArchaicPetra: {
        icons: {
            sands: "static/artifacts/ArchaicPetra/sands.webp",
            flower: "static/artifacts/ArchaicPetra/flower.webp",
            circlet: "static/artifacts/ArchaicPetra/circlet.webp",
            plume: "static/artifacts/ArchaicPetra/plume.webp",
            goblet: "static/artifacts/ArchaicPetra/goblet.webp"
        },
        text: {
            name: "Archaic Petra",
            setBonuses: [
                { count: 2, desc: "Elemental Burst DMG +20%" },
                { count: 4, desc: "Using an Elemental Burst increases all party members’ ATK by 20% for 12s. This effect cannot stack." },
            ]
        }
    },
    BloodstainedChivalry: {
        icons: {
            sands: "static/artifacts/BloodstainedChivalry/sands.webp",
            flower: "static/artifacts/BloodstainedChivalry/flower.webp",
            circlet: "static/artifacts/BloodstainedChivalry/circlet.webp",
            plume: "static/artifacts/BloodstainedChivalry/plume.webp",
            goblet: "static/artifacts/BloodstainedChivalry/goblet.webp"
        },
        text: {
            name: "Bloodstained Chivalry",
            setBonuses: [
                { count: 2, desc: "Elemental Burst DMG +20%" },
                { count: 4, desc: "Using an Elemental Burst increases all party members’ ATK by 20% for 12s. This effect cannot stack." },
            ]
        }
    },
    CrimsonWitchOfFlames: {
        icons: {
            sands: "static/artifacts/CrimsonWitchOfFlames/sands.webp",
            flower: "static/artifacts/CrimsonWitchOfFlames/flower.webp",
            circlet: "static/artifacts/CrimsonWitchOfFlames/circlet.webp",
            plume: "static/artifacts/CrimsonWitchOfFlames/plume.webp",
            goblet: "static/artifacts/CrimsonWitchOfFlames/goblet.webp"
        },
        text: {
            name: "Crimson Witch of Flames",
            setBonuses: [
                { count: 2, desc: "ATK +18%." },
                { count: 4, desc: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
            ]
        }
    },
    DeepwoodMemories: {
        icons: {
            sands: "static/artifacts/DeepwoodMemories/sands.webp",
            flower: "static/artifacts/DeepwoodMemories/flower.webp",
            circlet: "static/artifacts/DeepwoodMemories/circlet.webp",
            plume: "static/artifacts/DeepwoodMemories/plume.webp",
            goblet: "static/artifacts/DeepwoodMemories/goblet.webp"
        },
        text: {
            name: "Deepwood Memories",
            setBonuses: [
                { count: 2, desc: "ATK +18%." },
                { count: 4, desc: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
            ]
        }
    },
    EmblemOfSeveredFate: {
        icons: {
            sands: "static/artifacts/EmblemOfSeveredFate/sands.webp",
            flower: "static/artifacts/EmblemOfSeveredFate/flower.webp",
            circlet: "static/artifacts/EmblemOfSeveredFate/circlet.webp",
            plume: "static/artifacts/EmblemOfSeveredFate/plume.webp",
            goblet: "static/artifacts/EmblemOfSeveredFate/goblet.webp"
        },
        text: {
            name: "Gladiators Finale",
            setBonuses: [
                { count: 2, desc: "ATK +18%." },
                { count: 4, desc: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
            ]
        }
    },
    GildedDreams: {
        icons: {
            sands: "static/artifacts/GildedDreams/sands.webp",
            flower: "static/artifacts/GildedDreams/flower.webp",
            circlet: "static/artifacts/GildedDreams/circlet.webp",
            plume: "static/artifacts/GildedDreams/plume.webp",
            goblet: "static/artifacts/GildedDreams/goblet.webp"
        },
        text: {
            name: "Gilded Dreams",
            setBonuses: [
                { count: 2, desc: "ATK +18%." },
                { count: 4, desc: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
            ]
        }
    },
    GladiatorsFinale: {
        icons: {
            sands: "static/artifacts/GladiatorsFinale/sands.webp",
            flower: "static/artifacts/GladiatorsFinale/flower.webp",
            circlet: "static/artifacts/GladiatorsFinale/circlet.webp",
            plume: "static/artifacts/GladiatorsFinale/plume.webp",
            goblet: "static/artifacts/GladiatorsFinale/goblet.webp"
        },
        text: {
            name: "Gladiators Finale",
            setBonuses: [
                { count: 2, desc: "ATK +18%." },
                { count: 4, desc: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
            ]
        }
    },
    HeartOfDepths: {
        icons: {
            sands: "static/artifacts/HeartOfDepths/sands.webp",
            flower: "static/artifacts/HeartOfDepths/flower.webp",
            circlet: "static/artifacts/HeartOfDepths/circlet.webp",
            plume: "static/artifacts/HeartOfDepths/plume.webp",
            goblet: "static/artifacts/HeartOfDepths/goblet.webp"
        },
        text: {
            name: "Heart of Depths",
            setBonuses: [
                { count: 2, desc: "ATK +18%." },
                { count: 4, desc: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
            ]
        }
    },
    HuskOfOpulentDreams: {
        icons: {
            sands: "static/artifacts/HuskOfOpulentDreams/sands.webp",
            flower: "static/artifacts/HuskOfOpulentDreams/flower.webp",
            circlet: "static/artifacts/HuskOfOpulentDreams/circlet.webp",
            plume: "static/artifacts/HuskOfOpulentDreams/plume.webp",
            goblet: "static/artifacts/HuskOfOpulentDreams/goblet.webp"
        },
        text: {
            name: "Husk of Opulent Dreams",
            setBonuses: [
                { count: 2, desc: "ATK +18%." },
                { count: 4, desc: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
            ]
        }
    },
    NoblesseOblige: {
        icons: {
            sands: "static/artifacts/NoblesseOblige/sands.webp",
            flower: "static/artifacts/NoblesseOblige/flower.webp",
            circlet: "static/artifacts/NoblesseOblige/circlet.webp",
            plume: "static/artifacts/NoblesseOblige/plume.webp",
            goblet: "static/artifacts/NoblesseOblige/goblet.webp"
        },
        text: {
            name: "Noblesse Oblige",
            setBonuses: [
                { count: 2, desc: "Elemental Burst DMG +20%" },
                { count: 4, desc: "Using an Elemental Burst increases all party members’ ATK by 20% for 12s. This effect cannot stack." },
            ]
        }
    },
    PaleFlame: {
        icons: {
            sands: "static/artifacts/PaleFlame/sands.webp",
            flower: "static/artifacts/PaleFlame/flower.webp",
            circlet: "static/artifacts/PaleFlame/circlet.webp",
            plume: "static/artifacts/PaleFlame/plume.webp",
            goblet: "static/artifacts/PaleFlame/goblet.webp"
        },
        text: {
            name: "Pale Flame",
            setBonuses: [
                { count: 2, desc: "Elemental Burst DMG +20%" },
                { count: 4, desc: "Using an Elemental Burst increases all party members’ ATK by 20% for 12s. This effect cannot stack." },
            ]
        }
    },
    ShimenawasReminiscence: {
        icons: {
            sands: "static/artifacts/ShimenawasReminiscence/sands.webp",
            flower: "static/artifacts/ShimenawasReminiscence/flower.webp",
            circlet: "static/artifacts/ShimenawasReminiscence/circlet.webp",
            plume: "static/artifacts/ShimenawasReminiscence/plume.webp",
            goblet: "static/artifacts/ShimenawasReminiscence/goblet.webp"
        },
        text: {
            name: "Shimenawa's Reminiscence",
            setBonuses: [
                { count: 2, desc: "ATK +18%." },
                { count: 4, desc: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
            ]
        }
    },
    OceanHuedClam: {
        icons: {
            sands: "static/artifacts/OceanHuedClam/sands.webp",
            flower: "static/artifacts/OceanHuedClam/flower.webp",
            circlet: "static/artifacts/OceanHuedClam/circlet.webp",
            plume: "static/artifacts/OceanHuedClam/plume.webp",
            goblet: "static/artifacts/OceanHuedClam/goblet.webp"
        },
        text: {
            name: "Gladiators Finale",
            setBonuses: [
                { count: 2, desc: "ATK +18%." },
                { count: 4, desc: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
            ]
        }
    },
    TenacityOfTheMillelith: {
        icons: {
            sands: "static/artifacts/TenacityOfTheMillelith/sands.webp",
            flower: "static/artifacts/TenacityOfTheMillelith/flower.webp",
            circlet: "static/artifacts/TenacityOfTheMillelith/circlet.webp",
            plume: "static/artifacts/TenacityOfTheMillelith/plume.webp",
            goblet: "static/artifacts/TenacityOfTheMillelith/goblet.webp"
        },
        text: {
            name: "Crimson Witch of Flames",
            setBonuses: [
                { count: 2, desc: "ATK +18%." },
                { count: 4, desc: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
            ]
        }
    },
    ViridescentVenerer: {
        icons: {
            sands: "static/artifacts/ViridescentVenerer/sands.webp",
            flower: "static/artifacts/ViridescentVenerer/flower.webp",
            circlet: "static/artifacts/ViridescentVenerer/circlet.webp",
            plume: "static/artifacts/ViridescentVenerer/plume.webp",
            goblet: "static/artifacts/ViridescentVenerer/goblet.webp"
        },
        text: {
            name: "Viridescent Venerer",
            setBonuses: [
                { count: 2, desc: "ATK +18%." },
                { count: 4, desc: "If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by 35%." },
            ]
        }
    },
    WanderersTroupe: {
        icons: {
            sands: "static/artifacts/WanderersTroupe/sands.webp",
            flower: "static/artifacts/WanderersTroupe/flower.webp",
            circlet: "static/artifacts/WanderersTroupe/circlet.webp",
            plume: "static/artifacts/WanderersTroupe/plume.webp",
            goblet: "static/artifacts/WanderersTroupe/goblet.webp"
        },
        text: {
            name: "Wanderers Troupe",
            setBonuses: [
                { count: 2, desc: "Elemental Burst DMG +20%" },
                { count: 4, desc: "Using an Elemental Burst increases all party members’ ATK by 20% for 12s. This effect cannot stack." },
            ]
        }
    }
} as db;