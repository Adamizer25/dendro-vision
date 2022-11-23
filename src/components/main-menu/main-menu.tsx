import { Component, createSignal, For } from "solid-js";
import './main-menu.scss';


type params = {
    onClick: ((tab: string) => void)[];
    items?: string[]
    startingValue?: string
}

const MainMenu: Component<params> = props => {
    const standard = ["attributes", "weapons", "artifacts", "constellation", "talents", "conditions", "optimize"]
    const [tab, setTab] = createSignal(props.startingValue || "weapons");
    const onClick = (tabItem: string) => {
        if (tab() == tabItem) return;
        for (let clickItem of props.onClick) clickItem(tabItem);
        setTab(tabItem);
    }

    return <div class="main-list">
        <For each={props.items || standard}>{(tabItem) =>
            <h1 class={"pip" + (tab() == tabItem ? " active" : "")} onClick={[onClick, tabItem]}>
                <i class='select fa-solid fa-caret-right' />
                {tabItem}
            </h1>
        }</For>
    </div>
}

export default MainMenu;