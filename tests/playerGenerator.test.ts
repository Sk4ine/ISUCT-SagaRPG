import { PlayerClass, PlayerClasses } from "../src/playerClasses/playerClass";
import { PlayerGenerator } from "../src/playerGenerator";

describe("PlayerGenerator class", () => {
  it("CreatePlayer method playerClass check", () => {
    const player1: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Paladin, "Arthur");

    expect(player1.classID).toBe(PlayerClasses.Paladin);
  });

  const player2: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Archer, "George", 3, 8, 5);

  it("CreatePlayer defined strength", () => {
    expect(player2.strength).toBe(3);
  });

  it("CreatePlayer defined maxHealth", () => {
    expect(player2.maxHealth).toBe(8);
  });

  it("CreatePlayer defined health", () => {
    expect(player2.health).toBe(5);
  });

  it("CreatePlayer not defined health", () => {
    const player3: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Archer, "George", 3, 8);

    expect(player3.health).toBe(player2.maxHealth);
  });
});