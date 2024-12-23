import { Attack } from "../characterAbilities/attack";
import { Abilities } from "../characterAbilities/characterAbility";
import { FrostArrows } from "../characterAbilities/frostArrows";
import { PlayerClass, PlayerClasses } from "./playerClass";

export class Archer extends PlayerClass {
  protected randomGenerationValues = {
    maxHealthRange: [4, 10],
    strengthRange: [2, 4]
  }
  protected _classID = PlayerClasses.Archer;
  protected abilities = [new FrostArrows(2), new Attack()];
  protected abilityResists = [Abilities.FrostArrows];

  public constructor(playerName: string, strength?: number, maxHealth?: number, health?: number) {
      super(playerName, strength, maxHealth);
      this.generateRandomStats(health);
      this.resetStats();
  }
}