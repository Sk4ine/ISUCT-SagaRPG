import { PlayerClasses } from "./playerClass";

export abstract class Player {
  protected _playerName: string = "";
  get playerName(): string {
      return this._playerName;
  }

  protected _classID: PlayerClasses | null;
  get classID(): PlayerClasses {
      if(this._classID !== null) {
          return this._classID;
      }

      throw new Error("className is undefined");
  }
  
  public constructor(playerName: string, className: PlayerClasses | null) {
      this._playerName = playerName;
      this._classID = className;
  }
}