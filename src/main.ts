import {Paladin, Archer} from "./playerClass";
import {Game} from "./game";

let player1: Paladin = new Paladin("George");
let player2: Archer = new Archer("Arthur");
let game: Game = new Game(player1, player2);
game.startGame();

