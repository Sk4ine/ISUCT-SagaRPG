"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(player1, player2) {
        this.playerOrder = [];
        this.actionsQueue = [];
        this.playerOrder.push(player1);
        this.playerOrder.push(player2);
        this.playerOrder[0].game = this;
        this.playerOrder[1].game = this;
    }
    getResult() {
        if (this.playerOrder[0].getHealth() > 0) {
            return [this.playerOrder[0], this.playerOrder[1]];
        }
        else {
            return [this.playerOrder[1], this.playerOrder[0]];
        }
    }
    executeActionsQueue() {
        for (let i = this.actionsQueue.length - 1; i > -1; i--) {
            this.actionsQueue[i].execute();
        }
    }
    swapTurn() {
        let proc = this.playerOrder[0];
        this.playerOrder[0] = this.playerOrder[1];
        this.playerOrder[1] = proc;
    }
    startGame() {
        while (this.playerOrder[0].getHealth() > 0 && this.playerOrder[1].getHealth() > 0) {
            this.executeActionsQueue();
            this.playerOrder[0].useAbility(this.playerOrder[1]);
            this.swapTurn();
        }
        let result = this.getResult();
        console.log(`(${result[1].getClassName()}) ${result[1].getPlayerName()} dies`);
    }
    addToActionsQueue(action) {
        this.actionsQueue.push(action);
    }
    removeFromActionsQueue(action) {
        let index = this.actionsQueue.indexOf(action);
        this.actionsQueue.splice(index, 1);
    }
    executeLastFromActionsQueue() {
        this.actionsQueue[this.actionsQueue.length - 1].execute();
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map