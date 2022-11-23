import { iEffectCollection } from "../interfaces";
import { artifactLoadout } from "./artifactLoadout";
import { character } from "./character";
import { effect } from "./effect";
import { weapon } from "./weapon";

export class teamSlot implements iEffectCollection {
    get effects(): effect[] {
        return [...this.character.effects, ...this.weapon.effects, ...this.artifacts.effects];
    }
    character: character;
    artifacts: artifactLoadout;
    weapon: weapon;
    slotIndex: number;
    constructor(character: character, weapon: weapon, artifacts: artifactLoadout) {
        this.character = character;
        this.artifacts = artifacts;
        this.weapon = weapon;
        this.slotIndex = 0;
    }
    setSlotIndex(i: number) {
        this.slotIndex = i;
    }
}