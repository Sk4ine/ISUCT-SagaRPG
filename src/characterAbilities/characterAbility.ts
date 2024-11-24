import {PlayerClass} from "../playerClasses/playerClass";

export enum AbilityTypes {
    Attack,
    Ability,
    Effect
}

export enum Abilities {
    Attack,
    ShieldStrike,
    FrostArrows
}


export abstract class CharacterAbility {
    protected _abilityID: Abilities | undefined;
    public get abilityID(): Abilities {
        if(this._abilityID !== undefined) {
            return this._abilityID;
        }
        
        throw new Error("abilityID is undefined");
    }

    protected _maxUses: number | undefined;
    public get maxUses(): number {
        if(this._maxUses) {
            return this._maxUses;
        }

        throw new Error("maxUses is undefined");
    }

    protected _damage: number = 0;
    public get damage(): number {
        return this._damage;
    }

    public abstract use(caster: PlayerClass, target: PlayerClass): void;

    protected initializeMaxUses(customMaxUses: number | undefined): void {
        if(customMaxUses) {
            this._maxUses = customMaxUses;
            return;
        }
    }
}
