import { Component, createEffect, createSignal, For, Show } from "solid-js"
import { iArtifactJson } from "../../../calculations/interfaces"
import { playClick } from "../../../sounds"
import ArtifactDB from "../../../db/artifacts";
import Card from "../card";
import characters from "../../../db/characters";
import { get } from "../../../local-storage";

type params = {
    artifact: iArtifactJson
    showOwner?: boolean
    click?(): void
}

const ArtifactCard: Component<params> = (props: params) => {
    const [location, setLocation] = createSignal(props.artifact.location);
    const index = get().artifacts.findIndex(a => a.id == props.artifact.id);

    createEffect(() => {
        let newVal = get().artifacts[index]
        setLocation(newVal.location);
    })
    function getAsset(arti: iArtifactJson): string {
        let set = ArtifactDB[arti.setKey];
        if (!set) return arti.setKey;
        let icon = set.icons[arti.slotKey];
        return icon || arti.slotKey;
    }
    const sideIcon = () => {
        if (!props.showOwner) return;
        let found = characters(location() || "");
        return found ? found({} as any).imgs.side : undefined;
    }

    const stuff = {
        label: '+' + props.artifact.level,
        rarity: props.artifact.rarity,
        equipedBy: <Show when={sideIcon()}><span class="equiped-by" style={`background-image: url(${sideIcon()})`} /></Show>,
        showStars: true,
        onMouseUp: () => playClick(2),
        onClick: props.click
    }

    return <Card {...stuff}>
        <img src={getAsset(props.artifact)} />
    </Card>
}
export default ArtifactCard