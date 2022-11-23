import { Component, createSignal, Show, For, JSX } from "solid-js";
import { elementType } from "../../calculations/types";

type params = {
    trigger: elementType | undefined
}

type o = {
    name: string;
    trigger: string;
    html: () => JSX.Element;
}
const Options: o[] = [
    {
        name: "None",
        trigger: "none",
        html: () => <label>None</label>
    },
    {
        name: "Vaporize x2",
        trigger: "hydro",
        html: () =>
            <>
                <img src="./assets/static/elements/Element_pyro.png" />
                <i class="fa-solid fa-right-long" />
                <img src="./assets/static/elements/Element_hydro.png" />
            </>
    },
    {
        name: "Vaporize x1.5",
        trigger: "pyro",
        html: () =>
            <>
                <img src="./assets/static/elements/Element_hydro.png" />
                <i class="fa-solid fa-right-long" />
                <img src="./assets/static/elements/Element_pyro.png" />
            </>
    },
    {
        name: "Bloom",
        trigger: "hydro",
        html: () =>
            <>
                <img src="./assets/static/elements/Element_dendro.png" />
                <i class="fa-solid fa-right-long" />
                <img src="./assets/static/elements/Element_hydro.png" />
            </>
    },
    {
        name: "Burgeon",
        trigger: "pyro",
        html: () =>
            <>
                <div class="pair">
                    <img src="./assets/static/elements/Element_dendro.png" />
                    <i class="fa-solid fa-code-commit"></i>
                    <img src="./assets/static/elements/Element_hydro.png" />
                </div>
                <i class="fa-solid fa-right-long" />
                <img src="./assets/static/elements/Element_pyro.png" />
            </>
    },
    {
        name: "Hyperbloom",
        trigger: "electro",
        html: () =>
            <>
                <div class="pair">
                    <img src="./assets/static/elements/Element_dendro.png" />
                    <i class="fa-solid fa-code-commit"></i>
                    <img src="./assets/static/elements/Element_hydro.png" />
                </div>
                <i class="fa-solid fa-right-long" />
                <img src="./assets/static/elements/Element_electro.png" />
            </>
    },
]
const ReactionSelection: Component<params> = (props: params) => {
    const [value, setValue] = createSignal(Options[0]);
    const [openOptions, setOpenOptions] = createSignal(false);
    const availableOptions = () => {
        let o = Options.filter(o => o.trigger == props.trigger);
        return o;
    }
    const onSelect = (opt: o) => {
        setValue(opt);
        setOpenOptions(false);
    }

    return (
        <div class="select">
            <div class="selected" onClick={() => setOpenOptions(!openOptions())}>
                <Show when={value}>
                    <div class='option'>
                        {value().html()}
                    </div>
                </Show>
            </div>
            <Show when={openOptions()}>
                <div class="select-options">
                    <div class="option" onClick={() => onSelect(Options[0])}>
                        <label>None</label>
                    </div>
                    <For each={availableOptions()}>
                        {(opt, i) => <div class='option' onClick={() => onSelect(opt)}>{opt.html}</div>}
                    </For>
                </div>
            </Show>
        </div>
    );
}

export default ReactionSelection;