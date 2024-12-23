import { PlayerClass } from "../playerClasses/playerClass";
import { Abilities } from "../characterAbilities/characterAbility";

export enum Effects {
  Frost
}

export abstract class Effect {
  protected _abilityID: Abilities;
  public get abilityID(): Abilities {
    return this._abilityID;
  }

  protected _effectID: Effects | undefined;
  public get effectID(): Effects {
    if(this._effectID !== undefined) {
      return this._effectID;
    }

    throw new Error("effectID is undefined");
  }

  protected _turnsRemaining: number;
  public get turnsRemaining(): number {
    return this._turnsRemaining;
  }
  public set turnsRemaining(value: number) {
    if(value < 0) {
      throw new Error("Attempt to set effect's 'turnsRemaining' to a negative value");
    }

    this._turnsRemaining = value;
  }

  protected _damage: number = 0;
  public get damage(): number {
    return this._damage;
  }

  protected _caster: PlayerClass;
  public get caster(): PlayerClass {
    return this._caster;
  }

  public constructor(caster: PlayerClass, abilityID: Abilities, turnsRemaining: number) {
    this._turnsRemaining = turnsRemaining;
    this._caster = caster;
    this._abilityID = abilityID;
  }

  public abstract execute(target: PlayerClass): void;
}