import { Logger } from "./logger";
import {PlayerClass} from "./playerClasses/playerClass";

class Game {
    private playerOrder: PlayerClass[] = [];

    public constructor(player1: PlayerClass, player2: PlayerClass) {
        this.playerOrder.push(player1);
        this.playerOrder.push(player2);
        this.playerOrder[0].game = this;
        this.playerOrder[1].game = this;
    }

    private getLoser(): PlayerClass {
        if(this.playerOrder[0].health > 0) {
            return this.playerOrder[1];
        }

        return this.playerOrder[0];
    }
    
    private executePlayerEffects(): void {
        for(let i = 0; i < this.playerOrder.length; i++) {
            this.playerOrder[i].executeEffects();
        }
    }
    
    private swapTurn(): void {
        let proc: PlayerClass = this.playerOrder[0];
        this.playerOrder[0] = this.playerOrder[1];
        this.playerOrder[1] = proc;
    }
    
    public startGame(): void {
        while(this.playerOrder[0].health > 0 && this.playerOrder[1].health > 0) {
            this.executePlayerEffects();
            this.playerOrder[0].useAbility(this.playerOrder[1]);
            this.swapTurn();
        }
        
        let loser = this.getLoser();
        console.log(`(${Logger.playerClassNames[loser.classID]}) ${loser.playerName} dies`);
    }
}

export {Game};