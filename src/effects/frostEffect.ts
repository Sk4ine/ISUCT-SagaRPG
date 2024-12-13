import { Effect } from "./effect";

export class FrostEffect extends Effect {
    protected _damage = 2;

    public execute(): void {
        this.target.dealDamage(this.damage);
    }
}