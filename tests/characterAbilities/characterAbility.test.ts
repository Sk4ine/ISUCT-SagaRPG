import { Abilities, CharacterAbility } from "../../src/characterAbilities/characterAbility";
import { FrostArrows } from "../../src/characterAbilities/frostArrows";
import { ShieldStrike } from "../../src/characterAbilities/shieldStrike";

describe("CharacterAbility class", () => {
    const ability1: CharacterAbility = new ShieldStrike();
    const ability2: CharacterAbility = new FrostArrows(4);

    it("AbilityID field", () => {
        expect(ability1.abilityID).toBe(Abilities.ShieldStrike);
        expect(ability2.abilityID).toBe(Abilities.FrostArrows);
    });

    it("MaxUses field", () => {
        expect(ability1.maxUses).toBe(-1);
        expect(ability2.maxUses).toBe(4);
    });

    it("Damage field", () => {
        expect(ability1.damage).toBe(3);
        expect(ability2.damage).toBe(2);
    });
});