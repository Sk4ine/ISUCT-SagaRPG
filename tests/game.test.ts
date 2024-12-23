import { Game } from "../src/game";
import { PlayerClass, PlayerClasses } from "../src/playerClasses/playerClass";
import { PlayerGenerator } from "../src/playerGenerator";

describe("Game class", () => {
  it("Game result with 1hp player", () => {
    const player1: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Paladin, "Arthur", undefined, undefined, 1);
    const player2: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Archer, "George");
    
    const game: Game = new Game(player1, player2);
    const winner: PlayerClass = game.playGame();

    expect(winner).toBe(player2);
  });

  it("Game result with 0hp player", () => {
    const player1: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Paladin, "Arthur", undefined, undefined, 0);
    const player2: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Archer, "George");
    
    const game: Game = new Game(player1, player2);
    const winner: PlayerClass = game.playGame();

    expect(winner).toBe(player2);
  });
});