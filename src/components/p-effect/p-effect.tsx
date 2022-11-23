import { createSignal, Show, For } from "solid-js";
import { playClick } from "../../sounds";
import './p-effect.scss';

const PEffect = (props: any) => {
    let count = props.count ?? 0;
    const [current, setCurrent] = createSignal(0);
    const tick = () => {
        playClick(5);
        let x = current() == count ? 0 : current() + 1;
        setCurrent(x);
    }
    return (
        <span class={current() == props.count ? "effect-item highlight" : "effect-item"} onMouseUp={tick}>
            <span class="widgets">
                <Show when={!count}>
                    <i class="fa-solid fa-check"></i>
                </Show>
                <Show when={count == 1}>
                    <i class={`fa-solid fa-toggle-${current() == 1 ? "on" : "off"}`}></i>
                </Show>
                <Show when={count > 1}>
                    <For each={new Array(current())}>
                        {() => <i class="fa-regular fa-circle-dot"></i>}
                    </For>
                    <For each={new Array(count - current())}>
                        {() => <i class="fa-regular fa-circle"></i>}
                    </For>
                </Show>
            </span>
            {props.children}
        </span>
    )
}
export default PEffect;