import { Component, For } from "solid-js";
import { iArtifactJson } from "../../../calculations/interfaces";
import StatMatrix from "../../../calculations/statMatrix";
import { statMap, statType } from "../../../calculations/types";
import { label } from "../../../calculations/display";
import './substat-list.scss';

var countDecimals = (value: number) => {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
}
type params = {
    artifacts: (iArtifactJson | undefined)[]
}

const SubstatList: Component<params> = (props: params) => {
    const getStats = (): any[][] => {
        // make a map of stats then convert to array to loop over
        let stats = {} as statMap<statType, number>;
        for (let _artifact of props.artifacts) {
            if (!_artifact) continue;
            // add main stat value
            stats[_artifact.mainStatKey] ||= 0;
            stats[_artifact.mainStatKey] += StatMatrix.Main[_artifact.mainStatKey][_artifact.level];
            // add the stat of each substat
            for (let sub of _artifact.substats) {
                stats[sub.key] ||= 0;
                stats[sub.key] += sub.value;
            };
        }
        // convert to array [val1, val2][];
        let arr: (string | number)[][] = Object
            .keys(stats)
            .map((key: string) => {
                let lab = label[key as statType];
                let _val = stats[key as statType];
                let val = (countDecimals(_val) > 1) ? _val.toFixed(1).toString() : _val.toString();
                if (key.endsWith('_')) val += "%";
                return [lab, val];
            })
            .sort((a, b) => {
                if (a[0] > b[0]) return +1;
                else if ((a[0] < b[0])) return -1;
                return 0;
            });
        return arr;
    }

    return <For each={getStats()}>
        {(stat: any[]) =>
            <article class="stat">
                <label>{stat[0]}</label>
                <label>+{stat[1]}</label>
            </article>}
    </For>;
}
export default SubstatList;