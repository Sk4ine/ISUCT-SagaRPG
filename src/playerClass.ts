import {CharacterAbility, Attack, ShieldStrike, FrostArrows} from "./characterAbility";
import { Game } from "./game";
import { Logger } from "./logger";

abstract class Player {
    public playerName: string;
    public className: string = "";

    public getPlayerName(): string {
        return this.playerName;
    }

    public getClassName(): string {
        return this.className;
    }
    
    public constructor(playerName: string, className: string){
        this.playerName = playerName;
        this.className = className;
    }
}

abstract class PlayerClass extends Player {
    protected abilities: CharacterAbility[] = [];
    protected maxHealth: number = 0;
    protected strength: number = 0;
    protected abilitiesResists: string[] = [];

    protected health: number = this.maxHealth;
    protected abilitiesLeft: number[] = [];
    protected abilitiesUsed: number[] = Array(this.abilities.length).fill(0);
    public game?: Game;

    public constructor(playerName: string) {
        super(playerName, "");
    }

    public useAbility(target: PlayerClass): void {
        if(this.game === undefined) {
            console.log("Player game is not defined");
            return;
        }
        
        if(this.abilitiesLeft.length == 0) {
            return;
        }

        let chosenAbilityIndex: number = this.abilitiesLeft[Math.floor(Math.random() * this.abilitiesLeft.length)];
        let chosenAbility: CharacterAbility = this.abilities[chosenAbilityIndex];

        if(target.checkAbilityResist(chosenAbility.abilityName)) {
            Logger.resist(this.className, this.playerName, chosenAbility.abilityName, target.className, target.playerName);
        }
        else {
            chosenAbility.use(this, target, this.game);
        }

        this.abilitiesUsed[chosenAbilityIndex]++;

        if(this.abilitiesUsed[chosenAbilityIndex] == chosenAbility.maxUses) {
            this.abilitiesLeft.splice(chosenAbilityIndex, 1);
            this.abilitiesUsed.splice(chosenAbilityIndex, 1);
        }
    }

    public setHealth(value: number): void {
        if(value > this.maxHealth) {
            this.health = this.maxHealth;
            return;
        }

        if(value < 0) {
            this.health = 0;
            return;
        }

        this.health = value;
    }

    public getHealth(): number {
        return this.health;
    }

    public checkAbilityResist(abilityName: string): boolean {
        for(let resist in this.abilitiesResists) {
            if(this.abilitiesResists[resist] != abilityName) {
                continue;
            }
            return true;
        }
        return false;
    }

    public getStrength(): number {
        return this.strength;
    }

    protected resetStats(): void {
        this.health = this.maxHealth;
        this.abilitiesUsed = Array(this.abilities.length).fill(0);
        this.abilitiesLeft = [];
        for(let i = 0; i < this.abilities.length; i++) {
            this.abilitiesLeft.push(i);
        }
    }

    private gameIsNotInitialized(): void {
        throw new Error("Game is not initialized in player instance");
    }
}

class Paladin extends PlayerClass {
    public className = "Paladin";
    protected maxHealth = 10;
    protected strength = 2;
    protected abilities = [new ShieldStrike(), new FrostArrows(), new Attack()];
    protected abilitiesResists = [];
    
    public constructor(playerName: string) {
        super(playerName);
        this.resetStats();
    }
}

class Archer extends PlayerClass {
    public className = "Archer";
    protected maxHealth = 7;
    protected strength = 3;
    protected abilities = [new FrostArrows(2), new Attack()];
    protected abilitiesResists = ["Frost Arrows"];

    public constructor(playerName: string) {
        super(playerName);
        this.resetStats();
    }
}



export {Player, PlayerClass, Paladin, Archer};