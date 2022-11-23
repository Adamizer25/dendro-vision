import { Component, createSignal } from "solid-js";
import { iCharacter } from "../../../calculations/interfaces";
import { playClick } from "../../../sounds";
import Card from "../card";


interface Props {
    char: iCharacter;
    width?: number;
    selectedOrder?: number;
    active?: boolean;
    onSelect?(char: iCharacter): boolean;
    onClick?(): void;
}


const CharacterCard: Component<Props> = (props: Props) => {
    const elementUrl = `assets/static/elements/Element_${props.char.el}.png`;
    var nameTrim = props.char.name.length > 14 ? props.char.name.slice(0, 8) + '...' : props.char.name;
    nameTrim = nameTrim.replaceAll("_", " ");
    const [down, setDown] = createSignal(false);
    const [selected, setSelected] = createSignal(props.selectedOrder != 0);
    const [altActive, setAltActive] = createSignal(false);

    const onClick = () => {
        let active = props.onSelect ? props.onSelect(props.char) : false;
        setSelected(active);
        console.log("charcard", props)
        if (props.onClick) props.onClick();
    }
    const selection = () => selected() ? 'selected' : '';
    const active = () => props.active || altActive() ? 'active' : '';
    const downClass = () => down() ? 'mouse-down' : '';

    return (
        <Card
            styleClasses={`${selection()} ${downClass()} ${active()}`}
            label={"Lv. " + props.char.json.level}
            rarity={props.char.rarity}
            selectedOrder={props.selectedOrder}
            element={props.char.el}
            activable={true}
            clickSound={() => playClick(8)}
            onClick={onClick}
            onMouseDown={() => { setDown(true); setAltActive(true); }}
            onMouseUp={() => setDown(false)}
            onPointerOut={() => { setDown(false); setAltActive(false); }}>
            <img src={props.char.imgs.icon} />
        </Card>
        // <article
        //     class={`card${selection()}${downClass()}${active()}`}
        //     data-label={"Lv. " + props.char.json.level}
        //     onMouseDown={() => { setDown(true); setAltActive(true); }}
        //     onMouseUp={() => setDown(false)}
        //     onPointerOut={() => { setDown(false); setAltActive(false); }}
        //     onClick={_onClick}>
        //     <span class="selectable" data-order={props.selectedOrder} />
        //     <span class="activable" />
        //     <picture data-star={props.char.rarity} style={`background-image: url(${props.char.imgs.icon});`} />
        //     <span class={props.char.el} style={`background-image: url(${elementUrl});`} />
        // </article>
    );
}

export default CharacterCard;