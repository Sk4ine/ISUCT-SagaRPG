"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrostArrows = exports.ShieldStrike = exports.Attack = exports.CharacterAbility = void 0;
const logger_1 = require("./logger");
const playerAction_1 = require("./playerAction");
class CharacterAbility {
    constructor() {
        this.abilityName = "";
        this.maxUses = 0;
        this.damage = 0;
    }
    use(caster, target, game) {
        return;
    }
    initializeMaxUses(customMaxUses) {
        if (typeof customMaxUses !== "undefined") {
            this.maxUses = customMaxUses;
            return;
        }
    }
}
exports.CharacterAbility = CharacterAbility;
class Attack extends CharacterAbility {
    constructor() {
        super(...arguments);
        this.abilityName = "Attack";
        this.maxUses = -1;
    }
    use(caster, target, game) {
        this.damage = caster.getStrength();
        new playerAction_1.PlayerAction(game, true, caster, target, 1, this.abilityName, "Attack", this.damage);
    }
}
exports.Attack = Attack;
class ShieldStrike extends CharacterAbility {
    constructor() {
        super(...arguments);
        this.abilityName = "Shield Strike";
        this.maxUses = -1;
        this.damage = 3;
    }
    use(caster, target, game) {
        new playerAction_1.PlayerAction(game, true, caster, target, 1, this.abilityName, "Ability", this.damage);
    }
}
exports.ShieldStrike = ShieldStrike;
class FrostArrows extends CharacterAbility {
    constructor(customMaxUses) {
        super();
        this.abilityName = "Frost Arrows";
        this.maxUses = 1;
        this.damage = 2;
        this.initializeMaxUses(customMaxUses);
    }
    use(caster, target, game) {
        new playerAction_1.PlayerAction(game, false, caster, target, 3, this.abilityName, "Effect", this.damage);
        logger_1.Logger.effectCast(caster.getClassName(), caster.getPlayerName(), this.abilityName, target.getClassName(), target.getPlayerName());
    }
}
exports.FrostArrows = FrostArrows;
//# sourceMappingURL=characterAbility.js.map