import { CharacterAbility } from "../../src/characterAbilities/characterAbility";
import { ShieldStrike } from "../../src/characterAbilities/shieldStrike";
import { Archer } from "../../src/playerClasses/archer";
import { Paladin } from "../../src/playerClasses/paladin";
import { PlayerClass } from "../../src/playerClasses/playerClass";

describe("ShieldStrike class", () => {
    const player1: PlayerClass = new Paladin("Arthur");
    const player2: PlayerClass = new Archer("George");
    const shieldStrike: CharacterAbility = new ShieldStrike();

    it("Use method", () => {
        shieldStrike.use(player1, player2);

        expect(player2.health).toBe(player2.maxHealth - shieldStrike.damage);
    });
});