import { Effect } from "../effect";
import { Logger } from "../logger";
import { PlayerClass } from "../playerClasses/playerClass";
import { Abilities, CharacterAbility } from "./characterAbility";

export class FrostArrows extends CharacterAbility {
  protected _abilityID = Abilities.FrostArrows;
  protected _maxUses = 1;
  protected _damage = 2;
  private durationInTurns = 3;

  public constructor(customMaxUses?: number) {
      super();
      this.initializeMaxUses(customMaxUses);
  }

  public override use(caster: PlayerClass, target: PlayerClass): void {
      console.log(Logger.effectCast(caster.classID, caster.playerName, this.abilityID, target.classID, target.playerName));

      target.applyEffect(new Effect(this.abilityID, false, caster, target, this.durationInTurns, this.damage));
  }
}