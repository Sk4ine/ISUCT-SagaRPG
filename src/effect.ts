import { PlayerClass } from "./playerClasses/playerClass";
import { Abilities, AbilityTypes } from "./characterAbilities/characterAbility";

export class Effect {
  private _abilityID: Abilities;
  get abilityID(): Abilities {
    return this._abilityID;
  }

  private _turnsRemaining: number;
  get turnsRemaining(): number {
    return this._turnsRemaining;
  }
  set turnsRemaining(value: number) {
    if(value >= 0) {
      this._turnsRemaining = value;
      return;
    }

    throw new Error("Attempt to set effect's 'turnsRemaining' to a negative value");
  }

  private caster: PlayerClass;
  private target: PlayerClass;
  private damage: number = 0;

  public constructor(ability: Abilities, executeOnCreation: boolean, caster: PlayerClass, target: PlayerClass, turnsRemaining: number, damage: number) {
    this._abilityID = ability;
    this._turnsRemaining = turnsRemaining;
    this.caster = caster;
    this.target = target;

    if(damage !== undefined) {
        this.damage = damage;
    }
    
    if(executeOnCreation) {
        this.execute(false);
    }
  }

  public execute(spendTurns=true): void {
    if (spendTurns) this._turnsRemaining--;

    this.target.applyAbility(this.caster, this._abilityID, AbilityTypes.Effect, this.damage);
  }
}