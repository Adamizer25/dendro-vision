import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { iArtifactJson } from "../../calculations/interfaces";
import { get } from "../../local-storage";
import { playClick } from "../../sounds";
import ArtifactCard from "../card/artifact/artifact";
import CardPlaceholderCalc from "../card/placeholder-calc/placeholder-calc";
import './artifact-selection.scss';

type params = {
    onClick: (artifact: { slotKey: string, id?: number }) => void;
}

const ArtifactSelection: Component<params> = props => {
    const types = ["flower", "plume", "sands", "goblet", "circlet"];
    const [artifactTab, setArtifactTab] = createSignal("flower");

    return <>
        <div class="tabs">
            <For each={types}>
                {(type: string) => <label class={"tab" + (artifactTab() == type ? ' selected' : '')} onClick={[setArtifactTab, type]}>{type}</label>}
            </For>
        </div>
        <For each={types}>
            {(type) => <Show when={type == artifactTab()}>
                <div class="artifact-selection-menu">
                    <CardPlaceholderCalc clickSound={() => playClick(2)} onClick={() => props.onClick({ slotKey: artifactTab() })} />
                    <For each={get().artifacts.filter(a => a.slotKey == type)}>
                        {(arti: iArtifactJson) => <ArtifactCard artifact={arti} click={() => props.onClick(arti)} showOwner={true} />}
                    </For>
                </div>
            </Show>}
        </For>
    </>;
}

export default ArtifactSelection;