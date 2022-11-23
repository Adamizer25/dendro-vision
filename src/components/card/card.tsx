import { Component, createSignal, For, JSXElement, Show } from "solid-js";
import './card.scss';

type params = {
    label?: string
    rarity?: number
    element?: string
    activable?: boolean
    selectedOrder?: number
    showStars?: boolean
    styleClasses?: string
    equipedBy?: JSXElement
    clickSound?(): void
    onClick?(): void
    onMouseDown?(): void
    onMouseUp?(): void
    onPointerOut?(): void
    children?: JSXElement
};



const Card: Component<params> = props => {
    const [getStars, setStars] = createSignal([] as any);

    const stars = () => {
        if (getStars().length == 0) {
            setStars(new Array(props.rarity));
        }
        return getStars();
    }
    const _onMouseUp = () => {
        if (props.clickSound) props.clickSound();
        if (props.onMouseUp) props.onMouseUp();
    }

    const stuff = {
        "data-label": props.label || "--",
        class: `card ${props.styleClasses}`,
        onClick: props.onClick,
        onMouseDown: props.onMouseDown,
        onMouseUp: _onMouseUp,
        onPointerOut: props.onPointerOut
    }

    return (
        <article {...stuff}>
            <Show when={typeof props.selectedOrder == "number"}>
                <span class="selectable" data-order={props.selectedOrder} />
            </Show>
            <Show when={props.activable}>
                <span class="activable" />
            </Show>
            <picture data-star={props.rarity || 0}>
                {props.children}
            </picture>
            <Show when={props.showStars}>
                <span class="display">
                    <For each={stars()}>
                        {() => <i class="fa-solid fa-star" />}
                    </For>
                </span>
            </Show>
            <Show when={props.element}>
                <span class="element" data-element={props.element} />
            </Show>
            {props.equipedBy}
        </article>
    );
}


export default Card;