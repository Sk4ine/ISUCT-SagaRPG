import {PlayerClass} from "./playerClass";
import {PlayerAction} from "./playerClass";

class Game {
    private playerOrder: PlayerClass[] = [];
    private actionsQueue: PlayerAction[] = [];

    public constructor(player1: PlayerClass, player2: PlayerClass) {
        this.playerOrder.push(player1);
        this.playerOrder.push(player2);
        this.playerOrder[0].game = this;
        this.playerOrder[1].game = this;
    }

    private getResult(): PlayerClass[] {
        if(this.playerOrder[0].getHealth() > 0) {
            return [this.playerOrder[0], this.playerOrder[1]];
        }
        else {
            return [this.playerOrder[1], this.playerOrder[0]];
        }
    }
    
    private executeActionsQueue(): void {
        for(let i = this.actionsQueue.length - 1; i > -1; i--) {
            this.actionsQueue[i].execute();
        }
    }
    
    private swapTurn(): void {
        let proc: PlayerClass = this.playerOrder[0];
        this.playerOrder[0] = this.playerOrder[1];
        this.playerOrder[1] = proc;
    }
    
    public startGame(): void {
        while(this.playerOrder[0].getHealth() > 0 && this.playerOrder[1].getHealth() > 0) {
            this.executeActionsQueue();
            this.playerOrder[0].useAbility(this.playerOrder[1]);
            this.swapTurn();
        }
        
        let result = this.getResult();
        console.log(`(${result[1].getClassName()}) ${result[1].getPlayerName()} dies`);
    }

    public addToActionsQueue(action: PlayerAction): void {
        this.actionsQueue.push(action);
    }

    public removeFromActionsQueue(action: PlayerAction): void {
        let index = this.actionsQueue.indexOf(action);
        this.actionsQueue.splice(index, 1);
    }

    public executeLastFromActionsQueue(): void {
        this.actionsQueue[this.actionsQueue.length - 1].execute();
    }
}

export {Game};