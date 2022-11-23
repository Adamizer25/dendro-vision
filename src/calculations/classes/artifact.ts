import { statType, _reward } from "../types";
import { iStatCollection } from "../interfaces";
import { stat } from "./stat";

export class artifact implements iStatCollection {
    setName: string;
    stats: stat[] = [];
    get subStats(): stat[] {
        return this.stats;
    }
    constructor(setName: string, ...stats: stat[]) {
        this.setName = setName;
        for (let i = 0; i < stats.length && i < 5; i++) {
            this.stats.push(stats[i]);
        }
    }
    getStat(statType: statType) {
        let statFound = this.stats.find(s => s?.type === statType);
        return statFound?.value || 0;
    }
}