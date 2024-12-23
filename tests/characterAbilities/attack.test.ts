import { Attack } from "../../src/characterAbilities/attack";
import { CharacterAbility } from "../../src/characterAbilities/characterAbility";
import { PlayerClass, PlayerClasses } from "../../src/playerClasses/playerClass";
import { PlayerGenerator } from "../../src/playerGenerator";

describe("Attack class", () => {
    const player1: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Paladin, "Arthur");
    const player2: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Archer, "George");
    const attack: CharacterAbility = new Attack();

    it("Use method", () => {
        attack.use(player1, player2);
        
        expect(player2.health).toBe(player2.maxHealth - player1.strength);
    });
});