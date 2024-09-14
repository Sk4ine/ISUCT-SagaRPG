import { PlayerClass } from "./playerClass";
import { Game } from "./game";
import { Logger } from "./logger";

class PlayerAction {
  private turnsRemaining: number;
  private caster: PlayerClass;
  private target: PlayerClass;
  private damage: number = 0;
  private actionName: string;
  private actionType: string;
  private game: Game;

  public constructor(game: Game, executeOnCreation: boolean, caster: PlayerClass, target: PlayerClass, turnsRemaining: number, 
      actionName: string, actionType: string, damage: number) {
      this.turnsRemaining = turnsRemaining;
      this.caster = caster;
      this.target = target;
      this.actionName = actionName;
      this.actionType = actionType;
      this.game = game;
      if(damage !== undefined) {
          this.damage = damage;
      }
      this.game.addToActionsQueue(this);
      if(executeOnCreation) {
          this.game.executeLastFromActionsQueue();
      }
  }
  
  public execute(): void {
      this.turnsRemaining--;
      this.target.setHealth(this.target.getHealth() - this.damage);
      this.logOutput(this.caster.getClassName(), this.caster.getPlayerName(), this.target.getClassName(), this.target.getPlayerName(), this.damage, this.actionName);

      if(this.turnsRemaining == 0) {
          this.game.removeFromActionsQueue(this);
      }
  }

  private logOutput(casterClass: string, casterName: string, targetClass: string, targetName: string, damage: number, actionName: string | "undefined"): void {
      if(this.actionType == "Attack") {
          Logger.attack(casterClass, casterName, damage, targetClass, targetName);
      }
      if(this.actionType == "Ability") {
          Logger.ability(casterClass, casterName, actionName, damage, targetClass, targetName);
      }
      if(this.actionType == "Effect") {
          Logger.effectTick(actionName, damage, targetClass, targetName);
      }
  }
}

export {PlayerAction}