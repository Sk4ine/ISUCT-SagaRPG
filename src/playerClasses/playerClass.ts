import { CharacterAbility, Abilities } from "../characterAbilities/characterAbility";
import { Effect } from "../effects/effect";
import { Logger } from "../logger";
import { Player } from "./player";

export enum PlayerClasses {
    Paladin,
    Archer
}

export abstract class PlayerClass extends Player {
    protected abilities: CharacterAbility[] = [];
    protected abilityResists: Abilities[] = [];

    protected _strength: number | undefined;
    public get strength(): number {
        if(this._strength === undefined) {
            throw new Error("Player's strength is undefined");
        }

        return this._strength;
    }
    protected set strength(value) {
        if(value < 0) {
            throw new Error("Trying to set player's strength to a negative value");
        }

        this._strength = value;
    }

    protected _maxHealth: number | undefined;
    public get maxHealth(): number {
        if(this._maxHealth === undefined) {
            throw new Error("Player's maxHealth is undefined");
        }

        return this._maxHealth;
    }
    protected set maxHealth(value: number) {
        if(value < 0) {
            throw new Error("Trying to set player's maxHealth to a negative value");
        }

        this._maxHealth = value;
    }

    protected _health: number | undefined;
    public get health(): number {
        if(this._health === undefined) {
            throw new Error("Player's health is undefined");
        }

        return this._health;
    }
    protected set health(value: number) {
        if(value > this.maxHealth) {
            this._health = this.maxHealth;
            return;
        }

        if(value < 0) {
            this._health = 0;
            return;
        }

        this._health = value;
    }

    protected _appliedEffects: Effect[] = [];
    public get appliedEffects(): Effect[] {
        return this._appliedEffects;
    }

    protected abilitiesLeft: number[] = [];
    protected abilitiesUsed: number[] = Array(this.abilities.length).fill(0);

    protected randomGenerationValues: {maxHealthRange: number[], strengthRange: number[]} = {
        maxHealthRange: [-1, -1],
        strengthRange: [-1, -1]
    };

    public constructor(playerName: string, strength?: number, maxHealth?: number) {
        super(playerName, null);

        if(maxHealth !== undefined) this.maxHealth = maxHealth;
        if(strength !== undefined) this.strength = strength;
    }

    public useAbility(target: PlayerClass): void { 
        if(this.abilitiesLeft.length == 0) {
            return;
        }

        const chosenAbilityIndex: number = this.abilitiesLeft[Math.floor(Math.random() * this.abilitiesLeft.length)];
        const chosenAbility: CharacterAbility = this.abilities[chosenAbilityIndex];

        chosenAbility.use(this, target);
        
        this.abilitiesUsed[chosenAbilityIndex]++;

        if(this.abilitiesUsed[chosenAbilityIndex] == chosenAbility.maxUses) {
            this.abilitiesLeft.splice(chosenAbilityIndex, 1);
            this.abilitiesUsed.splice(chosenAbilityIndex, 1);
        }
    }

    protected checkAbilityResist(abilityID: Abilities): boolean {
        for(let resist in this.abilityResists) {
            if(this.abilityResists[resist] != abilityID) {
                continue;
            }
            return true;
        }
        return false;
    }

    protected generateRandomStats(health?: number): void {
        if(this._maxHealth === undefined) {
            this.maxHealth = Math.floor(Math.random() *
                (this.randomGenerationValues.maxHealthRange[1] - this.randomGenerationValues.maxHealthRange[0]) + this.randomGenerationValues.maxHealthRange[0])
        }

        if(this._strength === undefined) {
            this.strength = Math.floor(Math.random() *
                (this.randomGenerationValues.strengthRange[1] - this.randomGenerationValues.strengthRange[0]) + this.randomGenerationValues.strengthRange[0])
        }

        if(health === undefined) {
            this._health = this.maxHealth;
            return;
        }
        
        this.health = health;
    }

    protected resetStats(): void {
        this.abilitiesUsed = Array(this.abilities.length).fill(0);
        for(let i = 0; i < this.abilities.length; i++) {
            this.abilitiesLeft.push(i);
        }
    }

    public applyEffect(effect: Effect) {
        if(this.checkAbilityResist(effect.abilityID)) {
            Logger.logResist(effect.caster, effect.abilityID, this);
            return;
        }

        for(let i = 0; i < this._appliedEffects.length; i++) {
            if(this._appliedEffects[i].abilityID == effect.abilityID) {
                this._appliedEffects[i].turnsRemaining = effect.turnsRemaining;
                return;
            }
        }

        this._appliedEffects.push(effect);
        Logger.logEffectCast(effect.caster, effect.abilityID, effect.effectID, this);
    }

    protected executeAppliedEffects() {
        for(let i = this._appliedEffects.length - 1; i >= 0; i--) {
            this._appliedEffects[i].execute(this);
            if(this._appliedEffects[i].turnsRemaining == 0) {
                this._appliedEffects.splice(i, 1);
            }
        }
    }

    public dealDamage(damage: number): void {
        this.health = this.health - damage;
    }
    
    public applyAbility(caster: PlayerClass, ability: CharacterAbility, damage: number) {
        if(this.checkAbilityResist(ability.abilityID)) {
            console.log(Logger.logResist(caster, ability.abilityID, this));
            return;
        }

        this.health = this.health - damage;
        Logger.logAbilityUse(caster, this, damage, ability.abilityID, ability.abilityType);
    }

    public makeTurn(target: PlayerClass): void {
        this.executeAppliedEffects();
        if(this.health <= 0) {
            return;
        }

        this.useAbility(target);
    }
}