import { Component, For, JSXElement, Show } from "solid-js";
import { iArtifactJson, iWeapon } from "../calculations/interfaces";
import { statType } from "../calculations/types";
import { label } from "../calculations/display";
import { playClick } from "../sounds";
import CardPlaceholderCalc from "./card/placeholder-calc/placeholder-calc";
import PEffect from "./p-effect/p-effect";
import WeaponCard from "./card/weapon/weapon";

type roundLabelParams = {
    decimal?: number
    value?: number
    children?: JSXElement
}
const RoundLabel: Component<roundLabelParams> = (props: roundLabelParams) => {
    props.decimal ||= 0;
    return <label data-tooltip={props.value}>{props.value?.toFixed(props.decimal)}{props.children}</label>;
}

type weaponSectionParams = {
    weapon?: iWeapon
    onClick(): void
}
const WeaponSection: Component<weaponSectionParams> = (props: weaponSectionParams) => {
    return (
        <section class="weapon">
            <Show when={props.weapon}>
                <div class="weapon-card">
                    <WeaponCard weapon={props.weapon} clickSound={() => playClick(2)} onClick={props.onClick} />
                    <div class="detail">
                        <div class="info">
                            <h2>{props.weapon?.name}</h2>
                        </div>
                        <p class="weapon-type">{props.weapon?.weaponType}</p>
                        <div class="stats">
                            <label>Base ATK</label>
                            <RoundLabel value={props.weapon?.baseAtk} decimal={0} />
                        </div>
                        <div class="stats">
                            <label>{label[props.weapon?.substatType || "atk"]}</label>
                            <RoundLabel value={props.weapon?.substat} decimal={1}>%</RoundLabel>
                        </div>
                    </div>
                </div>
                <p style="margin: 0 0 0.4em;">{props.weapon?.weaponAffix}</p>
                <div class="affix">
                    <p class="effects">
                        <For each={props.weapon?.affixDescription}>
                            {(desc) => <PEffect count={desc.c}>
                                {desc.v}
                                {/* <div class='tool-tip'>
                                    <p>This is some dialog to explain this effect</p>
                                </div> */}
                            </PEffect>}
                        </For>
                    </p>
                </div>
            </Show>
            <Show when={!props.weapon}>
                <div class="weapon-card">
                    <CardPlaceholderCalc onClick={() => { }} clickSound={() => playClick(2)} />
                    <div class="detail">
                        <h2>Determine Best Available</h2>
                    </div>
                </div>
            </Show>
        </section>
    );
}
export default WeaponSection;