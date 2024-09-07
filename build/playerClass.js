"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerAction = exports.Archer = exports.Paladin = exports.PlayerClass = exports.Player = void 0;
const characterAbility_1 = require("./characterAbility");
const logger_1 = require("./logger");
class Player {
    getPlayerName() {
        return this.playerName;
    }
    getClassName() {
        return this.className;
    }
    constructor(playerName, className) {
        this.className = "";
        this.playerName = playerName;
        this.className = className;
    }
}
exports.Player = Player;
class PlayerClass extends Player {
    constructor(playerName) {
        super(playerName, "");
        this.abilities = [];
        this.maxHealth = 0;
        this.strength = 0;
        this.abilitiesResists = [];
        this.health = this.maxHealth;
        this.abilitiesLeft = [];
        this.abilitiesUsed = Array(this.abilities.length).fill(0);
    }
    useAbility(target) {
        if (this.game === undefined) {
            console.log("Player game is not defined");
            return;
        }
        if (this.abilitiesLeft.length == 0) {
            return;
        }
        let chosenAbilityIndex = this.abilitiesLeft[Math.floor(Math.random() * this.abilitiesLeft.length)];
        let chosenAbility = this.abilities[chosenAbilityIndex];
        if (target.checkAbilityResist(chosenAbility.abilityName)) {
            logger_1.Logger.resist(this.className, this.playerName, chosenAbility.abilityName, target.className, target.playerName);
        }
        else {
            chosenAbility.use(this, target, this.game);
        }
        this.abilitiesUsed[chosenAbilityIndex]++;
        if (this.abilitiesUsed[chosenAbilityIndex] == chosenAbility.maxUses) {
            this.abilitiesLeft.splice(chosenAbilityIndex, 1);
            this.abilitiesUsed.splice(chosenAbilityIndex, 1);
        }
    }
    setHealth(value) {
        if (value > this.maxHealth) {
            this.health = this.maxHealth;
            return;
        }
        if (value < 0) {
            this.health = 0;
            return;
        }
        this.health = value;
    }
    getHealth() {
        return this.health;
    }
    checkAbilityResist(abilityName) {
        for (let resist in this.abilitiesResists) {
            if (this.abilitiesResists[resist] != abilityName) {
                continue;
            }
            return true;
        }
        return false;
    }
    getStrength() {
        return this.strength;
    }
    resetStats() {
        this.health = this.maxHealth;
        this.abilitiesUsed = Array(this.abilities.length).fill(0);
        this.abilitiesLeft = [];
        for (let i = 0; i < this.abilities.length; i++) {
            this.abilitiesLeft.push(i);
        }
    }
    gameIsNotInitialized() {
        throw new Error("Game is not initialized in player instance");
    }
}
exports.PlayerClass = PlayerClass;
class Paladin extends PlayerClass {
    constructor(playerName) {
        super(playerName);
        this.className = "Paladin";
        this.maxHealth = 10;
        this.strength = 2;
        this.abilities = [new characterAbility_1.ShieldStrike(), new characterAbility_1.FrostArrows(), new characterAbility_1.Attack()];
        this.abilitiesResists = [];
        this.resetStats();
    }
}
exports.Paladin = Paladin;
class Archer extends PlayerClass {
    constructor(playerName) {
        super(playerName);
        this.className = "Archer";
        this.maxHealth = 7;
        this.strength = 3;
        this.abilities = [new characterAbility_1.FrostArrows(2), new characterAbility_1.Attack()];
        this.abilitiesResists = ["Frost Arrows"];
        this.resetStats();
    }
}
exports.Archer = Archer;
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
//# sourceMappingURL=playerClass.js.map