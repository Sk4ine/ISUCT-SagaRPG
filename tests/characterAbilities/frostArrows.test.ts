import { Abilities, CharacterAbility } from "../../src/characterAbilities/characterAbility";
import { FrostArrows } from "../../src/characterAbilities/frostArrows";
import { ShieldStrike } from "../../src/characterAbilities/shieldStrike";
import { Archer } from "../../src/playerClasses/archer";
import { Paladin } from "../../src/playerClasses/paladin";
import { PlayerClass } from "../../src/playerClasses/playerClass";

describe("FrostArrows class", () => {
    const player1: PlayerClass = new Paladin("Arthur");
    const player2: PlayerClass = new Archer("George");
    const frostArrows: CharacterAbility = new FrostArrows();

    it("Use method", () => {
        frostArrows.use(player1, player2);

        expect(player2.appliedEffects[0].ability.abilityID).toBe(Abilities.FrostArrows);
    });
});