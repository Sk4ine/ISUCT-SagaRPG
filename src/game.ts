import { Logger } from "./logger";
import {PlayerClass} from "./playerClasses/playerClass";

class Game {
    private _players: PlayerClass[] = [];
    private playerTurn = 0;

    public constructor(player1: PlayerClass, player2: PlayerClass) {
        this._players.push(player1);
        this._players.push(player2);
    }

    private getLoser(): PlayerClass {
        return this._players[this.playerTurn];
    }
    
    private executePlayerEffects(): void {
        for(let i = 0; i < this._players.length; i++) {
            this._players[i].executeEffects();
        }
    }
    
    private swapTurn(): void {
        this.playerTurn++;

        if(this.playerTurn > 1) {
            this.playerTurn = 0;
        }
    }
    
    public startGame(): void {
        while(this._players[0].health > 0 && this._players[1].health > 0) {
            this.executePlayerEffects();
            this._players[0].useAbility(this._players[1]);
            this.swapTurn();
        }
        
        let loser = this.getLoser();
        console.log(`(${Logger.playerClassNames[loser.classID]}) ${loser.playerName} dies`);
    }
}

export {Game};