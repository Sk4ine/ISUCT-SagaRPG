import { CharacterAbility } from "../../src/characterAbilities/characterAbility";
import { ShieldStrike } from "../../src/characterAbilities/shieldStrike";
import { PlayerClass, PlayerClasses } from "../../src/playerClasses/playerClass";
import { PlayerGenerator } from "../../src/playerGenerator";

describe("ShieldStrike class", () => {
    const player1: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Paladin, "Arthur");
    const player2: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Archer, "George");
    const shieldStrike: CharacterAbility = new ShieldStrike();

    it("Use method", () => {
        shieldStrike.use(player1, player2);

        expect(player2.health).toBe(player2.maxHealth - shieldStrike.damage);
    });
});