import { Attack } from "../../src/characterAbilities/attack";
import { CharacterAbility } from "../../src/characterAbilities/characterAbility";
import { Archer } from "../../src/playerClasses/archer";
import { Paladin } from "../../src/playerClasses/paladin";
import { PlayerClass } from "../../src/playerClasses/playerClass";

describe("Attack class", () => {
    const player1: PlayerClass = new Paladin("Arthur");
    const player2: PlayerClass = new Archer("George");
    const attack: CharacterAbility = new Attack();

    it("Use method", () => {
        attack.use(player1, player2);

        expect(player2.health).toBe(player2.maxHealth - player1.strength);
    });
});