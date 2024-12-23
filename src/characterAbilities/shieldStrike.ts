import { PlayerClass } from "../playerClasses/playerClass";
import { Abilities, AbilityTypes, CharacterAbility } from "./characterAbility";

export class ShieldStrike extends CharacterAbility {
  protected _abilityID = Abilities.ShieldStrike;
  protected _abilityType = AbilityTypes.Ability;
  protected _maxUses = -1;
  protected _damage = 3;

  public override use(caster: PlayerClass, target: PlayerClass): void {
      target.applyAbility(caster, this, this.damage);
  }
}