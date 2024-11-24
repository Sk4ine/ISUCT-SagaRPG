import {CharacterAbility, Abilities, AbilityTypes} from "../characterAbilities/characterAbility";
import { Effect } from "../effect";
import { Game } from "../game";
import { Logger } from "../logger";
import { Player } from "./player";

export enum PlayerClasses {
    Paladin,
    Archer
}

export abstract class PlayerClass extends Player {
    protected abilities: CharacterAbility[] = [];
    protected abilitiesResists: Abilities[] = [];
    protected maxHealth: number = 0;
    protected _strength: number = 0;
    get strength(): number {
        return this._strength;
    }

    protected _health: number = this.maxHealth;
    get health(): number {
        return this._health;
    }
    set health(value: number) {
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

    protected appliedEffects: Effect[] = [];

    protected abilitiesLeft: number[] = [];
    protected abilitiesUsed: number[] = Array(this.abilities.length).fill(0);

    protected _game: Game | undefined;
    get game(): Game {
        if(this._game) {
            return this._game;
        }

        throw new Error("Player's 'game' field is undefined");
    }
    set game(value: Game) {
        this._game = value;
    }

    public constructor(playerName: string) {
        super(playerName, null);
    }

    public useAbility(target: PlayerClass): void {
        if(!this._game) {
            throw new Error("Player game is not defined");
        }
        
        if(this.abilitiesLeft.length == 0) {
            return;
        }

        let chosenAbilityIndex: number = this.abilitiesLeft[Math.floor(Math.random() * this.abilitiesLeft.length)];
        let chosenAbility: CharacterAbility = this.abilities[chosenAbilityIndex];

        chosenAbility.use(this, target);

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
        this._health = this.maxHealth;
        this.abilitiesUsed = Array(this.abilities.length).fill(0);
        for(let i = 0; i < this.abilities.length; i++) {
            this.abilitiesLeft.push(i);
        }
    }

    public applyEffect(effect: Effect) {
        for(let i = 0; i < this.appliedEffects.length; i++) {
            if(this.appliedEffects[i].abilityID == effect.abilityID) {
                this.appliedEffects[i].turnsRemaining = effect.turnsRemaining;
                return;
            }
        }

        this.appliedEffects.push(effect);
    }

    public executeEffects() {
        for(let i = this.appliedEffects.length - 1; i >= 0; i--) {
            this.appliedEffects[i].execute();
            if(this.appliedEffects[i].turnsRemaining == 0) {
                this.appliedEffects.splice(i, 1);
            }
        }
    }
    
    public applyAbility(caster: PlayerClass, ability: Abilities, abilityType: AbilityTypes, damage: number) {
        if(this.checkAbilityResist(ability)) {
            Logger.resist(Logger.abilityNames[this.classID], this.playerName, Logger.abilityNames[ability], 
                Logger.playerClassNames[this.classID], this.playerName);
            return;
        }

        this.health = this.health - damage;
        Logger.logOutput(caster.classID, caster.playerName, this.classID, this.playerName, damage, ability, abilityType);
    }
}