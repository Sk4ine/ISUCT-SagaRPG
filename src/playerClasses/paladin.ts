import { Attack } from "../characterAbilities/attack";
import { FrostArrows } from "../characterAbilities/frostArrows";
import { ShieldStrike } from "../characterAbilities/shieldStrike";
import { PlayerClass, PlayerClasses } from "./playerClass";

export class Paladin extends PlayerClass {
  protected randomGenerationValues = {
    maxHealthRange: [7, 15],
    strengthRange: [1, 3]
  }
  protected _classID = PlayerClasses.Paladin;
  protected abilities = [new ShieldStrike(), new FrostArrows(), new Attack()];
  protected abilityResists = [];

  public constructor(playerName: string, strength?: number, maxHealth?: number, health?: number) {
      super(playerName, strength, maxHealth);
      this.generateRandomStats(health);
      this.resetStats();
  }
}