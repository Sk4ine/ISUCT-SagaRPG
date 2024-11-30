import { Abilities, AbilityTypes } from "../src/characterAbilities/characterAbility";
import { Effect } from "../src/effect";
import { Archer } from "../src/playerClasses/archer";
import { Paladin } from "../src/playerClasses/paladin";
import { PlayerClass } from "../src/playerClasses/playerClass";

describe("PlayerClass class", () => {
    const player1: PlayerClass = new Paladin("Arthur");
    const player2: PlayerClass = new Archer("George");

    it("Strength field", () => {
        expect(player1.strength).toBe(2);
        expect(player2.strength).toBe(3);
    });

    it("MaxHealth field", () => {
        expect(player1.maxHealth).toBe(10);
        expect(player2.maxHealth).toBe(7);
    });

    it("Health field", () => {
        expect(player1.health).toBe(player1.maxHealth);
        expect(player2.health).toBe(player2.maxHealth);
    });

    it("CheckAbilityResist method", () => {
        expect(player1.checkAbilityResist(Abilities.FrostArrows)).toBe(false);
        expect(player2.checkAbilityResist(Abilities.FrostArrows)).toBe(true);
    });

    it("ApplyEffect method", () => {
        const effect = new Effect(Abilities.FrostArrows, false, player2, player1, 3, 2);
        player1.applyEffect(effect);

        expect(player1.appliedEffects[0]).toBe(effect);
    });

    it("ApplyAbility method", () => {
        player1.applyAbility(player2, Abilities.Attack, AbilityTypes.Attack, player2.strength);

        expect(player1.health).toBe(player1.maxHealth - player2.strength);
    });
});