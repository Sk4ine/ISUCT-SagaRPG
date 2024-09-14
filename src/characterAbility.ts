import { Game } from "./game";
import { Logger } from "./logger";
import {PlayerClass} from "./playerClass";
import {PlayerAction} from "./playerAction";

abstract class CharacterAbility {
    public abilityName: string = "";
    public maxUses: number = 0;
    public damage: number = 0;

    public use(caster: PlayerClass, target: PlayerClass, game: Game): void {
        return;
    }

    protected initializeMaxUses(customMaxUses: number | undefined): void {
        if(typeof customMaxUses !== "undefined") {
            this.maxUses = customMaxUses;
            return;
        }
    }
}

class Attack extends CharacterAbility {
    public abilityName = "Attack";
    public maxUses = -1;

    public override use(caster: PlayerClass, target: PlayerClass, game: Game): void {
        this.damage = caster.getStrength();
        new PlayerAction(game, true, caster, target, 1, this.abilityName, "Attack", this.damage);
    }
}

class ShieldStrike extends CharacterAbility {
    public abilityName = "Shield Strike";
    public maxUses = -1;
    public damage = 3;

    public override use(caster: PlayerClass, target: PlayerClass, game: Game): void {
        new PlayerAction(game, true, caster, target, 1, this.abilityName, "Ability", this.damage);
    }
}

class FrostArrows extends CharacterAbility {
    public abilityName = "Frost Arrows";
    public maxUses = 1;
    public damage = 2;

    public constructor(customMaxUses?: number) {
        super();
        this.initializeMaxUses(customMaxUses);
    }

    public override use(caster: PlayerClass, target: PlayerClass, game: Game): void {
        new PlayerAction(game, false, caster, target, 3, this.abilityName, "Effect", this.damage);
        Logger.effectCast(caster.getClassName(), caster.getPlayerName(), this.abilityName, target.getClassName(), target.getPlayerName());
    }
}

export {CharacterAbility, Attack, ShieldStrike, FrostArrows};