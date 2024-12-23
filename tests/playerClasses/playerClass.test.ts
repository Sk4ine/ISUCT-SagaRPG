import { Attack } from "../../src/characterAbilities/attack";
import { Abilities } from "../../src/characterAbilities/characterAbility";
import { FrostEffect } from "../../src/effects/frostEffect";
import { PlayerClass, PlayerClasses } from "../../src/playerClasses/playerClass";
import { PlayerGenerator } from "../../src/playerGenerator";

describe("PlayerClass class", () => {
    const player1: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Paladin, "Arthur", 2, 10);
    const player2: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Archer, "George");

    it("Strength field", () => {
        expect(player1.strength).toBe(2);
    });

    it("MaxHealth field", () => {
        expect(player1.maxHealth).toBe(10);
    });

    it("Health field", () => {
        expect(player1.health).toBe(player1.maxHealth);
    });

    it("AppliedEffects field", () => {
        expect(player1.appliedEffects.length).toBe(0);
    });

    it("ApplyEffect method", () => {
        const effect = new FrostEffect(player2, Abilities.FrostArrows, 3);
        player1.applyEffect(effect);

        expect(player1.appliedEffects[0]).toBe(effect);
    });

    it("DealDamage method", () => {
        player2.dealDamage(1);

        expect(player2.health).toBe(player2.maxHealth - 1);
    });

    it("ApplyAbility method", () => {
        player1.applyAbility(player2, new Attack(), player2.strength);

        expect(player1.health).toBe(player1.maxHealth - player2.strength);
    });
});