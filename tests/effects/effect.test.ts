import { Abilities } from "../../src/characterAbilities/characterAbility";
import { Effect, Effects } from "../../src/effects/effect";
import { FrostEffect } from "../../src/effects/frostEffect";
import { Game } from "../../src/game";
import { PlayerClass, PlayerClasses } from "../../src/playerClasses/playerClass";
import { PlayerGenerator } from "../../src/playerGenerator";

describe("Effect class", () => {
    const player1: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Archer, "George", undefined, 200);
    const player2: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Paladin, "Arthur", undefined, 200);

    const effect: Effect = new FrostEffect(player1, Abilities.FrostArrows, 3);

    it("AbilityID field", () => {
        expect(effect.abilityID).toBe(Abilities.FrostArrows);
    });

    it("EffectID field", () => {
        expect(effect.effectID).toBe(Effects.Frost);
    });

    it("TurnsRemaining field", () => {
        expect(effect.turnsRemaining).toBe(3);
    });

    it("TurnsRemaining set to negative value", () => {
        expect(() => {effect.turnsRemaining = -2}).toThrow();
    });

    it("Damage field", () => {
        expect(effect.damage).toBe(2);
    });

    it("Caster field", () => {
        expect(effect.caster).toBe(player1);
    });

    it("Execute method turnsRemaining change", () => {
        effect.execute(player2);

        expect(effect.turnsRemaining).toBe(2);
    });

    it("Execute method damage", () => {
        expect(player2.health).toBe(player2.maxHealth - effect.damage);
    });

    it("Effect should be removed from player after its 'turnsRemaining' runs out", () => {
        player2.makeTurn(player1);
        player2.makeTurn(player1);

        expect(player2.appliedEffects.length).toBe(0);
    });
});