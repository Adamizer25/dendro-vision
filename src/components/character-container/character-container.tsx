import { Component, createSignal, For } from "solid-js";
import { iCharacter } from "../../calculations/interfaces";
import CharacterCard from "../card/character-card/character-card";
import './character-container.scss';

interface params {
    onSelect(selected: iCharacter, order: number, characters: iCharacter[]): void;
    characters: iCharacter[];
    selectionCount: number;
    startValues: [listItems, any, string]
}

type listItems = { char: iCharacter, order: number }[]

const CharacterContainer: Component<params> = (props: params) => {
    const [characterSelection, setCharacterSelection] = createSignal(props.startValues[0] || []);
    const [selectedOrderOfChar, setSelectedOrderOfChar] = createSignal(props.startValues[1] || {});
    const [activeName, setActiveName] = createSignal(props.startValues[2] || "");
    const onSelect = (char: iCharacter): boolean => {
        setActiveName(char.name);
        let order = 0;
        let active = false;
        var newSelectionToSet = characterSelection();
        var index = newSelectionToSet.findIndex(s => s.char.name === char.name)
        // if the character was unselected
        if (index != -1) {
            order = newSelectionToSet[index].order;
            newSelectionToSet.splice(index, 1);
            active = false;
        }
        // if the selection is less than maximum
        else if (newSelectionToSet.length < props.selectionCount) {
            for (let i = 1; i <= props.selectionCount; i++) {
                let foundOrder = newSelectionToSet.findIndex(s => s.order === i);
                if (foundOrder == -1) {
                    order = i;
                    break;
                }
            }
            let newSelectedItem = { char, order };
            let afterItems = newSelectionToSet.splice(order - 1);
            newSelectionToSet.push(newSelectedItem);
            newSelectionToSet.push(...afterItems);
            active = true;
        }
        setCharacterSelection(newSelectionToSet);
        props.onSelect(char, order, characterSelection().map(s => s.char))

        let newOrder: any = {};
        for (let sel of newSelectionToSet) {
            newOrder[sel.char.name] = sel.order;
        }
        setSelectedOrderOfChar(newOrder)
        return active;
    }
    const active = (charName: string) => charName === activeName();

    return (
        <ul class='character-container'>
            <For each={props.characters}>{(char, i) =>
                <CharacterCard
                    onSelect={onSelect}
                    char={char}
                    selectedOrder={selectedOrderOfChar()[char.name]}
                    active={active(char.name)} />}
            </For>
        </ul>
    );
}
export default CharacterContainer;