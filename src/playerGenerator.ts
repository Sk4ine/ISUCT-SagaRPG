import { Archer } from "./playerClasses/archer";
import { Paladin } from "./playerClasses/paladin";
import { PlayerClass, PlayerClasses } from "./playerClasses/playerClass";

export abstract class PlayerGenerator {
  public static createPlayer(playerClass: PlayerClasses, name: string, strength?: number, maxHealth?: number, health?: number): PlayerClass {
    let newPlayer: PlayerClass;

    switch(playerClass) {
      case PlayerClasses.Paladin:
        newPlayer = new Paladin(name, strength, maxHealth, health);
        break;
      case PlayerClasses.Archer:
        newPlayer = new Archer(name, strength, maxHealth, health);
        break;
    }
    
    if(newPlayer === undefined) {
      throw new Error("Player is undefined after generation");
    }

    return newPlayer;
  }
}