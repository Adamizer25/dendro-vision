import { weapon } from "./calculations/classes/weapon";
import { iArtifactJson, iCharacter, iCharacterJson, iWeapon, iWeaponJson } from "./calculations/interfaces";
import createLocalStorageSignal from "./local";
import weapons from "./db/weapons";
import characters from "./db/characters";
import { weaponType } from "./calculations/types";

type LocalStorage = {
    artifacts: iArtifactJson[]
    weapons: iWeaponJson[]
    characters: iCharacterJson[]
}

export const [get, set] = createLocalStorageSignal<LocalStorage>('storage')

export function FindArtifacts(name: string): iArtifactJson[] {
    return get()?.artifacts.filter((a: iArtifactJson) => a.location === name);
}
export function FindWeapons(name: string): iWeapon | undefined {
    let weaponJson = get()?.weapons
        .filter((c: iWeaponJson) => weapons(c))
        .find((a: iWeaponJson) => a.location === name);
    if (weaponJson) {
        return weapons(weaponJson);
    }
}
export function AllWeapons(slotKey?: weaponType): iWeapon[] {
    if (!slotKey) {
        return get()?.weapons.map(w => weapons(w)).filter(w => w != undefined) as iWeapon[];
    }
    else {
        return get()?.weapons.map(w => weapons(w)).filter(w => w != undefined && w.weaponType == slotKey) as iWeapon[];
    }
}
export function FindCharacters(name: string): iCharacter | undefined {
    let characterJson = get()?.characters
        .filter((c: iCharacterJson) => characters(c.key))
        .find((a: iCharacterJson) => a.key === name);
    if (characterJson) {
        return characters(characterJson.key)(characterJson);
    }
}
export function AllCharacters(): iCharacter[] {
    return get()?.characters
        .filter((c: iCharacterJson) => characters(c.key))
        .map((c: iCharacterJson) => characters(c.key)(c));
}

export function readFile(file: any, success: any, failure: any) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onerror = () => failure();
    reader.onload = (evt: any) => {
        let json = JSON.parse(evt.target.result);
        if (!json.artifacts || json.format !== "GOOD") return failure();
        set(json);
        return success();
    }
}

export function assignWeapon(charName: string, item: iWeaponJson) {
    let newStorage = get();
    let oldIndex = newStorage.weapons.findIndex(i => i.location === charName);
    if (oldIndex != -1) {
        newStorage.weapons[oldIndex].location = "";
    }
    let newIndex = newStorage.weapons.findIndex(i => i.id == item.id)
    if (newIndex != -1) {
        newStorage.weapons[newIndex].location = charName;
    }

}
export function assignArtifact(charName: string, item: { slotKey: string, id?: number }) {
    set(storage => {
        let oldIndex = storage.artifacts.findIndex(i => i.location === charName && i.slotKey == item.slotKey);
        if (oldIndex != -1) storage.artifacts[oldIndex].location = "";
        let index = storage.artifacts.findIndex(i => i.id == item.id);
        if (index != -1) storage.artifacts[index].location = charName;
        console.log("Storage Updated")
        return storage;
    });
}