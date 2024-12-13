import { Effect, Effects } from "../effects/effect";
import { FrostEffect } from "../effects/frostEffect";
import { Logger } from "../logger";
import { PlayerClass } from "../playerClasses/playerClass";
import { Abilities, AbilityTypes, CharacterAbility } from "./characterAbility";

export class FrostArrows extends CharacterAbility {
  protected _abilityID = Abilities.FrostArrows;
  protected _abilityType = AbilityTypes.EffectAbility;
  protected _maxUses = 1;
  protected _damage = 2;
  private durationInTurns = 3;

  public constructor(customMaxUses?: number) {
      super();
      this.initializeMaxUses(customMaxUses);
  }

  public override use(caster: PlayerClass, target: PlayerClass): void {
      target.applyEffect(new FrostEffect(caster, target, this.durationInTurns));
      Logger.logEffectCast(caster, this.abilityID, Effects.Frost, target);
  }
}