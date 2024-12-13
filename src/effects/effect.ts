import { PlayerClass } from "../playerClasses/playerClass";
import { Abilities, AbilityTypes, CharacterAbility } from "../characterAbilities/characterAbility";

export enum Effects {
  Frost
}

export abstract class Effect {
  protected _effectID: Effects | undefined;
  public get effectID(): Effects {
    if(this._effectID !== undefined) {
        return this._effectID;
    }
    
    throw new Error("effectID is undefined");
}

  protected _turnsRemaining: number;
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

  protected _damage: number = 0;
  get damage(): number {
    return this._damage;
  }

  protected caster: PlayerClass;
  protected target: PlayerClass;

  public constructor(caster: PlayerClass, target: PlayerClass, turnsRemaining: number) {
    this._turnsRemaining = turnsRemaining;
    this.caster = caster;
    this.target = target;
  }

  public abstract execute(): void;
}