import { Abilities } from "../src/characterAbilities/characterAbility";
import { Logger } from "../src/logger"
import { PlayerClasses } from "../src/playerClasses/playerClass"

describe("Logger class methods", () => {
    it("Attack log method", () => {
        expect(Logger.attack(PlayerClasses.Paladin, "Arthur", 5, PlayerClasses.Archer, "George")).toBe("(Paladin) Arthur deals 5 damage to (Archer) George");
    });

    it("Ability log method", () => {
        expect(Logger.ability(PlayerClasses.Paladin, "Arthur", Abilities.ShieldStrike, 4, PlayerClasses.Archer, "George")).toBe(
            "(Paladin) Arthur is using (Shield Strike) dealing 4 damage to (Archer) George"
        );
    });

    it("EffectCast log method", () => {
        expect(Logger.effectCast(PlayerClasses.Archer, "George", Abilities.FrostArrows, PlayerClasses.Paladin, "Arthur")).toBe(
            "(Archer) George applies (Frost Arrows) on (Paladin) Arthur"
        );
    });

    it("EffectTick log method", () => {
        expect(Logger.effectTick(Abilities.FrostArrows, 2, PlayerClasses.Paladin, "Arthur")).toBe(
            "(Frost Arrows) deals 2 tick damage to (Paladin) Arthur"
        );
    });

    it("Resist log method", () => {
        expect(Logger.resist(PlayerClasses.Archer, "George", Abilities.FrostArrows, PlayerClasses.Paladin, "Arthur")).toBe(
            "(Archer) George is using (Frost Arrows) on (Paladin) Arthur and deals no damage due to immunity"
        );
    });
})