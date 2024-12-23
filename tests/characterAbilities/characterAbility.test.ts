import { Abilities, AbilityTypes, CharacterAbility } from "../../src/characterAbilities/characterAbility";
import { FrostArrows } from "../../src/characterAbilities/frostArrows";

describe("CharacterAbility class", () => {
    const ability: CharacterAbility = new FrostArrows(4);

    it("AbilityID field", () => {
        expect(ability.abilityID).toBe(Abilities.FrostArrows);
    });

    it("AbilityType field", () => {
        expect(ability.abilityType).toBe(AbilityTypes.EffectAbility)
    });

    it("MaxUses field", () => {
        expect(ability.maxUses).toBe(4);
    });

    it("Damage field", () => {
        expect(ability.damage).toBe(2);
    });
});