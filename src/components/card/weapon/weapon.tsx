import { Component, createEffect, createSignal, For, Show } from "solid-js"
import { iWeapon, iWeaponJson } from "../../../calculations/interfaces"
import characters from "../../../db/characters"
import { get } from "../../../local-storage"
import Card from "../card"

type params = {
    weapon?: iWeapon
    showOwner?: boolean
    clickSound(): void
    onClick(): void
}

export const WeaponCard: Component<params> = (props: params) => {
    const [icon, setIcon] = createSignal(sideIcon(props.weapon?.json.location));

    createEffect(() => {
        if (props.weapon) {
            let newVal = get().weapons.find(a => a.id == props.weapon?.json.id) as iWeaponJson;
            setIcon(sideIcon(newVal.location));
        }
    })
    function sideIcon(location: string) {
        if (!props.showOwner) return;
        let found = characters(location || "");
        return found ? found({} as any).imgs.side : undefined;
    }

    const stuff = {
        label: "Lv. " + props.weapon?.json.level,
        rarity: props.weapon?.rarity,
        equipedBy: <Show when={icon()}><span class="equiped-by" style={`background-image: url(${icon()})`} /></Show>,
        showStars: true,
        onMouseUp: props.clickSound,
        onClick: props.onClick
    }
    return (
        <Card {...stuff}>
            <img src={props.weapon?.assets?.tn} />
            <div class="refinement-label">{props.weapon?.json?.refinement || 1}</div>
        </Card>
    );
}

export default WeaponCard;