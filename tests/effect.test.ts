import { Abilities } from "../src/characterAbilities/characterAbility";
import { FrostArrows } from "../src/characterAbilities/frostArrows";
import { Effect } from "../src/effects/effect";
import { Archer } from "../src/playerClasses/archer";
import { Paladin } from "../src/playerClasses/paladin";
import { PlayerClass } from "../src/playerClasses/playerClass";

describe("Effect class", () => {
    const player1: PlayerClass = new Archer("George");
    const player2: PlayerClass = new Paladin("Arthur");

    const effect: Effect = new Effect(new FrostArrows(), false, player1, player2, 3, 2);

    it("AbilityID field", () => {
        expect(effect.ability.abilityID).toBe(Abilities.FrostArrows);
    });

    it("TurnsRemaining field", () => {
        expect(effect.turnsRemaining).toBe(3);
    });

    it("Damage field", () => {
        expect(effect.damage).toBe(2);
    });

    it("Execute method turnsRemaining change", () => {
        effect.execute();
        expect(effect.turnsRemaining).toBe(2);
    });

    it("Execute method damage", () => {
        expect(player2.health).toBe(player2.maxHealth - effect.damage);
    });
});