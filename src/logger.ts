import { Abilities, AbilityTypes } from "./characterAbilities/characterAbility";
import { PlayerClasses } from "./playerClasses/playerClass";

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

    public static logOutput(casterClassID: PlayerClasses, casterName: string, targetClassID: PlayerClasses, targetName: string, damage: number, abilityID: Abilities, abilityType: AbilityTypes): void {
        let message: string = "";
        
        if(abilityType == AbilityTypes.Attack) {
            message = this.attack(casterClassID, casterName, damage, targetClassID, targetName);
        }
        else if(abilityType == AbilityTypes.Ability) {
            message = this.ability(casterClassID, casterName, abilityID, damage, targetClassID, targetName);
        }
        else if(abilityType == AbilityTypes.Effect) {
            message = this.effectTick(abilityID, damage, targetClassID, targetName);
        }

        console.log(message);
    }

    public static attack(casterClassID: PlayerClasses, casterName: string, attackDamage: number, targetClassID: PlayerClasses, targetName: string): string {
        return `(${this.playerClassNames[casterClassID]}) ${casterName} deals ${attackDamage} damage to (${this.playerClassNames[targetClassID]}) ${targetName}`;
    }

    public static ability(casterClassID: PlayerClasses, casterName: string, abilityID: Abilities, abilityDamage: number, targetClassID: PlayerClasses, targetName: string): string {
        return `(${this.playerClassNames[casterClassID]}) ${casterName} is using (${this.abilityNames[abilityID]}) dealing ${abilityDamage} damage to (${this.playerClassNames[targetClassID]}) ${targetName}`;
    }

    public static effectCast(casterClassID: PlayerClasses, casterName: string, effectID: Abilities, targetClassID: PlayerClasses, targetName: string): string {
        return `(${this.playerClassNames[casterClassID]}) ${casterName} applies (${this.abilityNames[effectID]}) on (${this.playerClassNames[targetClassID]}) ${targetName}`;
    }

    public static effectTick(effectID: Abilities, effectDamage: number, targetClassID: PlayerClasses, targetName: string): string {
        return `(${this.abilityNames[effectID]}) deals ${effectDamage} tick damage to (${this.playerClassNames[targetClassID]}) ${targetName}`;
    }

    public static resist(casterClassID: PlayerClasses, casterName: string, abilityID: Abilities, targetClassID: PlayerClasses, targetName: string): string {
        return `(${this.playerClassNames[casterClassID]}) ${casterName} is using (${this.abilityNames[abilityID]}) on (${this.playerClassNames[targetClassID]}) ${targetName} and deals no damage due to immunity`;
    }
}

export {Logger};