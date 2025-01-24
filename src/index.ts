import {Game} from "./game";
import { PlayerGenerator } from "./playerGenerator";
import { PlayerClass, PlayerClasses } from "./playerClasses/playerClass";
import { Logger } from "./logger";

let player1: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Paladin);
let player2: PlayerClass = PlayerGenerator.createPlayer(PlayerClasses.Archer);
let game: Game = new Game(player1, player2);
const winner: PlayerClass = game.playGame();
Logger.logPlayerWin(winner);
