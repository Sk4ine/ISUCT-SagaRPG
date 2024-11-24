import { Attack } from "../characterAbilities/attack";
import { Abilities } from "../characterAbilities/characterAbility";
import { FrostArrows } from "../characterAbilities/frostArrows";
import { PlayerClass, PlayerClasses } from "./playerClass";

export class Archer extends PlayerClass {
  protected _classID = PlayerClasses.Archer;
  protected maxHealth = 7;
  protected _strength = 3;
  protected abilities = [new FrostArrows(2), new Attack()];
  protected abilitiesResists = [Abilities.FrostArrows];

  public constructor(playerName: string) {
      super(playerName);
      this.resetStats();
  }
}