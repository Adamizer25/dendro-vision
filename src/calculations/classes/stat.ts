import { statType } from "../types";

export class stat {
    type: statType;
    value: number;
    constructor(label: statType, value: number) {
        this.type = label;
        this.value = value;
    }
}