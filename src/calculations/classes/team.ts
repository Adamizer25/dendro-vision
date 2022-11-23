import { teamSlot } from "../classes/teamSlot";
import { iEffectCollection } from "../interfaces";
import { effect } from "./effect";
import { parameters } from "./parameter";
import { statType } from "../types";

export class team implements iEffectCollection {
    parameters: parameters = new parameters();
    slots: teamSlot[];
    constructor(...slots: teamSlot[]) {
        this.slots = [];
        for (let i = 0; i < slots.length; i++) {
            let slot = slots[i];
            slot.setSlotIndex(i);
            this.slots.push(slot)
        }
    }
    get effects(): effect[] {
        // get shared effects from all characters
        let effects: effect[] = [];
        for (let slot of this.slots)
            effects.concat(slot.effects);
        return effects;
    }
    getStatFromEffects(statType: statType, i: number): number {
        let activeEffects = this.effects.filter(e => e.condition(this, i) === true);
        let desiredStat = 0;
        for (let effect of activeEffects)
            for (let reward of effect.reward(this, i))
                if (reward.type === statType) desiredStat += reward.value;
        return desiredStat;
    }
}