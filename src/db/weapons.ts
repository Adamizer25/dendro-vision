import { iWeapon, iWeaponJson } from "../calculations/interfaces";
import { kvp } from "../calculations/types";
import key_of_khaj_nisut from "./weapons/key_of_khaj_nisut";
import wolfs_gravestone from "./weapons/wolfs_gravestone";
import aquila_favonia from "./weapons/aquila_favonia";
import dull_blade from "./weapons/1/dull_blade";


const weapons: kvp<iWeaponJson, iWeapon> = {
    "KeyOfKhajNisut": key_of_khaj_nisut,
    "WolfsGravestone": wolfs_gravestone,
    "AquilaFavonia": aquila_favonia,
    "DullBlade": dull_blade
}
export default (json: iWeaponJson) => weapons[json.key] ? weapons[json.key](json) : undefined;