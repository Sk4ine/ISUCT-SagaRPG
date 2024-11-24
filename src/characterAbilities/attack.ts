import { PlayerClass } from "../playerClasses/playerClass";
import { Abilities, AbilityTypes, CharacterAbility } from "./characterAbility";

export class Attack extends CharacterAbility {
  protected _abilityID = Abilities.Attack;
  protected _maxUses = -1;

  public override use(caster: PlayerClass, target: PlayerClass): void {
      this._damage = caster.strength;
      target.applyAbility(caster, this.abilityID, AbilityTypes.Attack, this.damage);
  }
}