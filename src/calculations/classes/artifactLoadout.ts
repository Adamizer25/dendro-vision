import { artifact } from "./artifact";
import { iStatCollection, iEffectCollection } from "../interfaces";
import { setsArray, statType } from "../types";
import { effect } from "./effect";

export class artifactLoadout implements iStatCollection, iEffectCollection {
    sets: setsArray = [];
    flower: artifact | undefined;
    feather: artifact | undefined;
    timePiece: artifact | undefined;
    goblet: artifact | undefined;
    circlet: artifact | undefined;
    constructor(flower?: artifact, feather?: artifact, timePiece?: artifact, goblet?: artifact, circlet?: artifact) {
        this.flower = flower;
        this.feather = feather;
        this.timePiece = timePiece;
        this.goblet = goblet;
        this.circlet = circlet;
        let artifacts = [flower, feather, timePiece, goblet, circlet];
        for (let artifact of artifacts) {
            let setName = artifact?.setName || "";
            let foundSet = this.sets.find(set => set.setName === setName);
            if (foundSet) foundSet.count++;
            else this.sets.push({ setName, count: 0 });
        }
    }
    get effects(): effect[] {
        return [];
    }
    getStat(statType: statType): number {
        const artifacts = [this.flower, this.feather, this.timePiece, this.goblet, this.circlet];
        let stat = 0;
        for (let artifact of artifacts) {
            if (artifact == undefined) continue;
            stat += artifact?.getStat(statType) || 0;
        }
        return stat;
    }
}