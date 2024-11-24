import { Attack } from "../characterAbilities/attack";
import { FrostArrows } from "../characterAbilities/frostArrows";
import { ShieldStrike } from "../characterAbilities/shieldStrike";
import { PlayerClass, PlayerClasses } from "./playerClass";

export class Paladin extends PlayerClass {
  protected _classID = PlayerClasses.Paladin;
  protected maxHealth = 10;
  protected _strength = 2;
  protected abilities = [new ShieldStrike(), new FrostArrows(), new Attack()];
  protected abilitiesResists = [];
  
  public constructor(playerName: string) {
      super(playerName);
      this.resetStats();
  }
}