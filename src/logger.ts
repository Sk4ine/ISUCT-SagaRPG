import { Abilities, AbilityTypes } from "./characterAbilities/characterAbility";
import { Effect, Effects } from "./effects/effect";
import { PlayerClass, PlayerClasses } from "./playerClasses/playerClass";

abstract class Logger {
    
    public static abilityNames = [
        "Attack",
        "Shield Strike",
        "Frost Arrows"
    ];

    public static playerClassNames = [
        "Paladin",
        "Archer"
    ];

    public static effectNames = [
        "Frost"
    ];
    
    public static logAbilityUse(caster: PlayerClass, target: PlayerClass, damage: number, abilityID: Abilities, abilityType: AbilityTypes): void {
        let message: string = "";
        
        if(abilityType == AbilityTypes.Attack) {
            message = this.attack(caster.classID, caster.playerName, damage, target.classID, target.playerName);
        }
        else if(abilityType == AbilityTypes.Ability) {
            message = this.ability(caster.classID, caster.playerName, abilityID, damage, target.classID, target.playerName);
        }

        console.log(message);
    }

    public static logResist(caster: PlayerClass, abilityID: Abilities, target: PlayerClass): void {
        console.log(this.resist(caster.classID, caster.playerName, abilityID, target.classID, target.playerName))
    }

    public static logEffectCast(caster: PlayerClass, effectAbility: Abilities, effectID: Effects, target: PlayerClass): void {
        console.log(this.effectCast(caster.classID, caster.playerName, effectAbility, effectID, target.classID, target.playerName));
    }

    public static logEffectTick(effect: Effect, target: PlayerClass): void {
        console.log(this.effectTick(effect.effectID, effect.damage, target.classID, target.playerName));
    }
    
    public static attack(casterClassID: PlayerClasses, casterName: string, attackDamage: number, targetClassID: PlayerClasses, targetName: string): string {
        return `(${this.playerClassNames[casterClassID]}) ${casterName} deals ${attackDamage} damage to (${this.playerClassNames[targetClassID]}) ${targetName}`;
    }

    public static ability(casterClassID: PlayerClasses, casterName: string, abilityID: Abilities, abilityDamage: number, targetClassID: PlayerClasses, targetName: string): string {
        return `(${this.playerClassNames[casterClassID]}) ${casterName} is using (${this.abilityNames[abilityID]}) dealing ${abilityDamage} damage to (${this.playerClassNames[targetClassID]}) ${targetName}`;
    }

    public static effectCast(casterClassID: PlayerClasses, casterName: string, abilityID: Abilities, effectID: Effects, targetClassID: PlayerClasses, targetName: string): string {
        return `(${this.playerClassNames[casterClassID]}) ${casterName} uses (${this.abilityNames[abilityID]}) and applies (${this.effectNames[effectID]}) on (${this.playerClassNames[targetClassID]}) ${targetName}`;
    }

    public static effectTick(effectID: Effects, effectDamage: number, targetClassID: PlayerClasses, targetName: string): string {
        return `(${this.effectNames[effectID]}) deals ${effectDamage} tick damage to (${this.playerClassNames[targetClassID]}) ${targetName}`;
    }

    public static resist(casterClassID: PlayerClasses, casterName: string, abilityID: Abilities, targetClassID: PlayerClasses, targetName: string): string {
        return `(${this.playerClassNames[casterClassID]}) ${casterName} is using (${this.abilityNames[abilityID]}) on (${this.playerClassNames[targetClassID]}) ${targetName} and deals no damage due to immunity`;
    }
}

export {Logger};