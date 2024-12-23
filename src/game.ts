import { Logger } from "./logger";
import { PlayerClass } from "./playerClasses/playerClass";

export class Game {
    private players: PlayerClass[] = [];
    private playerTurn = 0;

    public constructor(player1: PlayerClass, player2: PlayerClass) {
        this.players.push(player1);
        this.players.push(player2);
    }

    private getWinner(): PlayerClass {
        for(let i = 0; i < this.players.length; i++) {
            if(this.players[i].health > 0) {
                return this.players[i];
            }
        }

        throw new Error("Couldn't get game winner");
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

        return this.players[targetIndex];
    }
    
    public playGame(): PlayerClass {
        Logger.logPlayerStats(this.players[0]);
        Logger.logPlayerStats(this.players[1]);

        while(this.players[0].health > 0 && this.players[1].health > 0) {
            this.players[this.playerTurn].makeTurn(this.getTarget());
            this.swapTurn();
        }
        
        return this.getWinner();
    }
}