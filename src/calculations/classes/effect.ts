import { condition, _reward, reward } from "../types";
import { stat } from "./stat";

export class effect {
    private _locked: boolean = false;
    private _condition: condition;
    public condition: condition = (team, index) => {
        if (this._locked) return false;
        try {
            this._locked = true;
            return this._condition(team, index);
        }
        finally {
            this._locked = false;
        }
    }
    private _reward: _reward;
    public reward: reward = (team, index) => {
        if (this._locked) return [];
        try {
            this._locked = true;
            return this._reward(team, index);
        }
        finally {
            this._locked = false;
        }
    }
    constructor(condition: condition, reward: _reward) {
        this._condition = condition;
        this._reward = reward;
    }
    static permanent(reward: _reward) {
        return new effect(() => true, reward);
    }
    static onParam(param: string, reward: _reward) {
        return new effect((team) => team.parameters.getParam(param), reward);
    }
    static selfishBuff(...stats: stat[]): reward { return (team, i) => team.slots[i].slotIndex === i ? stats : [] }
}