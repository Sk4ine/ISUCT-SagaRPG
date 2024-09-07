"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playerClass_1 = require("./playerClass");
const game_1 = require("./game");
let player1 = new playerClass_1.Paladin("George");
let player2 = new playerClass_1.Archer("Arthur");
let game = new game_1.Game(player1, player2);
game.startGame();
//# sourceMappingURL=main.js.map