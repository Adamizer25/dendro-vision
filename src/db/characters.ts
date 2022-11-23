import { iCharacterJson, iCharacter } from "../calculations/interfaces";
import { kvp } from "../calculations/types";
import bennett from "./characters/bennett";
import diluc from "./characters/diluc";
import kokomi from "./characters/kokomi";
import nilou from "./characters/nilou";
import venti from "./characters/venti";


const characters: kvp<iCharacterJson, iCharacter> = {
    "Venti": venti,
    "Bennett": bennett,
    "Diluc": diluc,
    "Kokomi": kokomi,
    "Nilou": nilou
}
export default (key: string): (json: iCharacterJson) => iCharacter => characters[key];
