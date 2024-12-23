import { Logger } from "../logger";
import { PlayerClass } from "../playerClasses/playerClass";
import { Effect, Effects } from "./effect";

export class FrostEffect extends Effect {
    protected _effectID = Effects.Frost;
    protected _damage = 2;

    public execute(target: PlayerClass): void {
        target.dealDamage(this.damage);
        this.turnsRemaining--;
        Logger.logEffectTick(this, target);
    }
}