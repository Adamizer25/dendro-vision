import { Component, createSignal, For, Show } from "solid-js";
import { iArtifactJson } from "../../calculations/interfaces";
import { label } from "../../calculations/display";
import { playClick } from "../../sounds";
import ArtifactDB from "./../../db/artifacts";
import ArtifactCard from "../card/artifact/artifact";
import CardPlaceholderCalc from "../card/placeholder-calc/placeholder-calc";
import SubstatList from "./substat-list.tsx/substat-list";
import './artifact-section.scss';
import { get } from "../../local-storage";

type params = {
    charName: string
    onArtifactClick: () => void
};
type keyVal = { name: string, count: any };

function keyIndex(key: string) {
    switch (key) {
        case "flower": return 5;
        case "plume": return 4;
        case "sands": return 3;
        case "goblet": return 2;
        case "circlet": return 1;
        default: return 0;
    }
}

function RelicSort(a: iArtifactJson, b: iArtifactJson) { return (keyIndex(a.slotKey) > keyIndex(b.slotKey)) ? -1 : 1; }

const ArtifactSection: Component<params> = (props: params) => {
    // createEffect(() => {
    //     let newVal = get().artifacts[index]
    //     setLocation(newVal.location);
    // })
    const artifactsOfCharacter = () => {
        let artifacts = get().artifacts.filter(a => a.location == props.charName);
        let f = artifacts.find(a => a.slotKey == "flower");
        let p = artifacts.find(a => a.slotKey == "plume");
        let s = artifacts.find(a => a.slotKey == "sands");
        let g = artifacts.find(a => a.slotKey == "goblet");
        let c = artifacts.find(a => a.slotKey == "circlet");
        return [f, p, s, g, c];
    }

    function getSetCount() {
        var hist: keyVal[] = [];
        artifactsOfCharacter().map((a: iArtifactJson | undefined) => {
            if (a?.setKey) {
                let index = hist.findIndex(i => i.name === a.setKey);
                if (index === -1) hist.push({ name: a.setKey, count: 1 });
                else hist[index].count += 1;
            }
        });
        return hist;
    }
    function anySetBonusMetFilter(sets: keyVal[]) {
        return sets.filter(set => ArtifactDB[set.name].text.setBonuses.filter((sb: any) => sb.count <= set.count).length > 0);
    }
    return (
        <section class="artifacts">
            <ul>
                <For each={artifactsOfCharacter()}>
                    {(arti: iArtifactJson | undefined, ind) => <>
                        <Show when={arti != undefined}>
                            <ArtifactCard artifact={arti as iArtifactJson} click={props.onArtifactClick} />
                        </Show>
                        <Show when={arti == undefined}>
                            <CardPlaceholderCalc onClick={props.onArtifactClick} clickSound={() => playClick(2)} />
                        </Show>
                    </>}
                </For>
            </ul>
            <SubstatList artifacts={artifactsOfCharacter()} />
            <Show when={anySetBonusMetFilter(getSetCount()).length > 0}>
                <h3>Set Bonus</h3>
            </Show>
            <For each={anySetBonusMetFilter(getSetCount())}>
                {(set) =>
                    <div class="artifact-set-bonus">
                        <h3>{ArtifactDB[set.name].text.name}</h3>
                        <For each={ArtifactDB[set.name].text.setBonuses.filter((sb: any) => sb.count <= set.count)}>
                            {(setBonuses: any) =>
                                <p>
                                    <i class="fa-solid fa-circle-check"></i>
                                    {setBonuses.count}-Piece Set: {setBonuses.desc}
                                </p>}
                        </For>
                    </div>}
            </For>
        </section>
    );
}

export default ArtifactSection;