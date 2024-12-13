import {CharacterAbility, Abilities, AbilityTypes} from "../characterAbilities/characterAbility";
import { Effect } from "../effects/effect";
import { Logger } from "../logger";
import { Player } from "./player";

export enum PlayerClasses {
    Paladin,
    Archer
}

export abstract class PlayerClass extends Player {
    protected abilities: CharacterAbility[] = [];
    protected abilitiesResists: Abilities[] = [];
    protected _strength: number = 0;
    get strength(): number {
        return this._strength;
    }

    protected _maxHealth: number = 0;
    get maxHealth(): number {
        return this._maxHealth;
    }

    protected _health: number = this._maxHealth;
    get health(): number {
        return this._health;
    }
    private set health(value: number) {
        if(value > this._maxHealth) {
            this._health = this._maxHealth;
            return;
        }

        if(value < 0) {
            this._health = 0;
            return;
        }

        this._health = value;
    }

    protected _appliedEffects: Effect[] = [];
    get appliedEffects(): Effect[] {
        return this._appliedEffects;
    }

    protected abilitiesLeft: number[] = [];
    protected abilitiesUsed: number[] = Array(this.abilities.length).fill(0);

    public constructor(playerName: string) {
        super(playerName, null);
    }

    public useAbility(target: PlayerClass): void { 
        if(this.abilitiesLeft.length == 0) {
            return;
        }

        let chosenAbilityIndex: number = this.abilitiesLeft[Math.floor(Math.random() * this.abilitiesLeft.length)];
        let chosenAbility: CharacterAbility = this.abilities[chosenAbilityIndex];

        if(!target.checkAbilityResist(chosenAbility.abilityID)) {
            chosenAbility.use(this, target);
        }
        else {
            Logger.logResist(this, chosenAbility.abilityID, target);
        }

        this.abilitiesUsed[chosenAbilityIndex]++;

        if(this.abilitiesUsed[chosenAbilityIndex] == chosenAbility.maxUses) {
            this.abilitiesLeft.splice(chosenAbilityIndex, 1);
            this.abilitiesUsed.splice(chosenAbilityIndex, 1);
        }
    }

    public checkAbilityResist(abilityID: Abilities): boolean {
        for(let resist in this.abilitiesResists) {
            if(this.abilitiesResists[resist] != abilityID) {
                continue;
            }
            return true;
        }
        return false;
    }

    protected resetStats(): void {
        this._health = this._maxHealth;
        this.abilitiesUsed = Array(this.abilities.length).fill(0);
        for(let i = 0; i < this.abilities.length; i++) {
            this.abilitiesLeft.push(i);
        }
    }

    public dealDamage(damage: number): void {
        if(damage < 0) {
            throw new Error("Tried to deal negative damage to player");
        }

        this.health -= damage;
    }

    public applyEffect(effect: Effect) {
        for(let i = 0; i < this._appliedEffects.length; i++) {
            if(this._appliedEffects[i].effectID == effect.effectID) {
                this._appliedEffects[i].turnsRemaining = effect.turnsRemaining;
                return;
            }
        }

        this._appliedEffects.push(effect);
    }

    public executeAppliedEffects() {
        for(let i = this._appliedEffects.length - 1; i >= 0; i--) {
            this._appliedEffects[i].execute();
            if(this._appliedEffects[i].turnsRemaining == 0) {
                this._appliedEffects.splice(i, 1);
            }
        }
    }
    
    public applyAbility(caster: PlayerClass, ability: CharacterAbility, damage: number) {
        if(this.checkAbilityResist(ability.abilityID)) {
            console.log(Logger.resist(this.classID, this.playerName, ability.abilityID, this.classID, this.playerName));
            return;
        }

        this.health = this.health - damage;
        Logger.logAbilityUse(caster.classID, caster.playerName, this.classID, this.playerName, damage, ability.abilityID, ability.abilityType) ;
    }

    public makeTurn(target: PlayerClass): void {
        this.executeAppliedEffects();
        if(this.health < 0) {
            return;
        }

        this.useAbility(target);
    }
}