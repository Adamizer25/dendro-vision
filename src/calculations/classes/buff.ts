export const totalStat = (baseHp: number, hp_: number, hp: number) => baseHp * (100 + hp_) / 100 + hp;

export const damage = (
    level_attacker: number,
    motion_val: number,
    atk: number,
    special_multiplier: number = 1,
    flat_dmg_bonus: number = 0,
    dmg_bonus: number = 0,
    crit_rate: number = 5,
    crit_dmg: number = 50,
    def_target: number,
    def_dmg_reduction_target: number
) => {
    let base_dmg = motion_val * atk;
    let dmg_reduction_target = def_target / (def_target + 5 * level_attacker + 500);
    let def_multiplier_target = 1 - def_dmg_reduction_target;
    let res_multiplier_target = 0;
    let amplifying_multiplier = 0;

    let dmg = ((base_dmg * special_multiplier) + flat_dmg_bonus)
        * (1 + dmg_bonus - dmg_reduction_target)
        * def_multiplier_target
        * res_multiplier_target
        * amplifying_multiplier;
    let dmg_crit = dmg * (1 + crit_dmg)
}

export type attacker = {
    lv: number
    motion_val: number
    stat: number
    special_multiplier: number
    dmg_bonus: number
    flat_dmg_bonus: number
    res_reduction: number
    def_ignore: number
    def_reduction: number
}

export type target = {
    lv: number
    res_base: number
    res_bonus: number
    type: 1 | 2
    dmg_reduction: number
}

export const dealingDamage = (a: attacker, t: target) => {
    const TargetResMult = (t: target) => {
        let res = t.res_base + t.res_bonus - a.res_reduction;
        if (res < 0) {
            return (1 - (res / 2));
        }
        if (0 <= res && res < 0.75) {
            return (1 - res);
        }
        return (1 / (4 * res + 1));
    }
    const TargetDefMult = (a: attacker, t: target) => {
        const DefReduction = Math.min(a.def_reduction, 0.9);
        const DefIgnore = Math.min(a.def_ignore, 1);
        let k = (1 - DefReduction) * (1 - DefIgnore);
        return (a.lv + 100) / (k * (t.lv + 100) + (a.lv + 100));
    }
    const BaseDamage = a.motion_val * a.stat;
    const SpecialMultiplier = a.special_multiplier ||= 1;
    const FlatDamage = a.flat_dmg_bonus;
    const DamageBonus = a.dmg_bonus;
    const DamageReduction = t.dmg_reduction;
    const Crit = 1;
    const EnemyDefMult = TargetDefMult(a, t);
    const EnemyResMult = TargetResMult(t);
    const AmplifyingReaction = 1;
    const TransformativeReaction = 0;
    const Proc = 0;

    return ((BaseDamage * SpecialMultiplier) + FlatDamage)
        * (1 + DamageBonus - DamageReduction)
        * Crit
        * EnemyDefMult
        * EnemyResMult
        * AmplifyingReaction
        + TransformativeReaction
        + Proc;
}

export const Calculate = { totalStat, damage, dealingDamage }