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
    
    private swapTurn(): void {
        this.playerTurn++;

        if(this.playerTurn > 1) {
            this.playerTurn = 0;
        }
    }

    private getTarget(): PlayerClass {
        let targetIndex = this.playerTurn;

        targetIndex++;

        if(targetIndex > 1) targetIndex = 0;

        return this._players[targetIndex];
    }
    
    public startGame(): void {
        while(this._players[0].health > 0 && this._players[1].health > 0) {
            this._players[this.playerTurn].makeTurn(this.getTarget());
            this.swapTurn();
        }
        
        let loser = this.getLoser();
        console.log(`(${Logger.playerClassNames[loser.classID]}) ${loser.playerName} dies`);
    }
}

export {Game};