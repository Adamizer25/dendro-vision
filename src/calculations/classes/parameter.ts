import { parameter } from "../types";

export class parameters {
    private _requiredParameters: parameter[] = [];
    get requiredParameters(): parameter[] { return this._requiredParameters; }
    addRequiredParameters(key: string) {
        // does a record with the same key exist in array
        // AKA does it already exist?
        // if not, add it, otherwise ignore
        let found = this._requiredParameters.find(p => p.hasOwnProperty(key)) || false;
        if (found === false) this._requiredParameters.push({ [key]: true });
    }
    setParam(key: string, value: boolean) {
        let found = this.params.find(p => p.hasOwnProperty(key)) || false;
        if (!found) this.params.push({ [key]: value });
    }

    private params: parameter[] = [];
    getParam(key: string): boolean {
        this.addRequiredParameters(key);
        let found = this.params.find(p => p.hasOwnProperty(key)) || { [key]: false };
        return found[key];
    }
}