import { PlayerClass, PlayerClasses } from "../../src/playerClasses/playerClass";
import { PlayerGenerator } from "../../src/playerGenerator";

describe("Player class", () => {
  const player: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Paladin, "Arthur");

  it("PlayerName field", () => {
    expect(player.playerName).toBe("Arthur");
  });

  it("ClassID field", () => {
    expect(player.classID).toBe(PlayerClasses.Paladin);
  });
});