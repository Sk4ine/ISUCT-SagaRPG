"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerAction = void 0;
const logger_1 = require("./logger");
class PlayerAction {
    constructor(game, executeOnCreation, caster, target, turnsRemaining, actionName, actionType, damage) {
        this.damage = 0;
        this.turnsRemaining = turnsRemaining;
        this.caster = caster;
        this.target = target;
        this.actionName = actionName;
        this.actionType = actionType;
        this.game = game;
        if (damage !== undefined) {
            this.damage = damage;
        }
        this.game.addToActionsQueue(this);
        if (executeOnCreation) {
            this.game.executeLastFromActionsQueue();
        }
    }
    execute() {
        this.turnsRemaining--;
        this.target.setHealth(this.target.getHealth() - this.damage);
        this.logOutput(this.caster.getClassName(), this.caster.getPlayerName(), this.target.getClassName(), this.target.getPlayerName(), this.damage, this.actionName);
        if (this.turnsRemaining == 0) {
            this.game.removeFromActionsQueue(this);
        }
    }
    logOutput(casterClass, casterName, targetClass, targetName, damage, actionName) {
        if (this.actionType == "Attack") {
            logger_1.Logger.attack(casterClass, casterName, damage, targetClass, targetName);
        }
        if (this.actionType == "Ability") {
            logger_1.Logger.ability(casterClass, casterName, actionName, damage, targetClass, targetName);
        }
        if (this.actionType == "Effect") {
            logger_1.Logger.effectTick(actionName, damage, targetClass, targetName);
        }
    }
}
exports.PlayerAction = PlayerAction;
//# sourceMappingURL=playerAction.js.map