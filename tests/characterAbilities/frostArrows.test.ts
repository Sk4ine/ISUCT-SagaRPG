import { Abilities, CharacterAbility } from "../../src/characterAbilities/characterAbility";
import { FrostArrows } from "../../src/characterAbilities/frostArrows";
import { Archer } from "../../src/playerClasses/archer";
import { Paladin } from "../../src/playerClasses/paladin";
import { PlayerClass, PlayerClasses } from "../../src/playerClasses/playerClass";
import { PlayerGenerator } from "../../src/playerGenerator";

describe("FrostArrows class", () => {
    const player1: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Paladin, "Arthur");
    const player2: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Archer, "George");
    const frostArrows: CharacterAbility = new FrostArrows();

    it("Use method", () => {
        frostArrows.use(player2, player1);
        
        expect(player1.appliedEffects[0].abilityID).toBe(Abilities.FrostArrows);
    });
});