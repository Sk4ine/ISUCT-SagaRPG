import { PlayerClasses } from "./playerClass";

export abstract class Player {
    protected _playerName: string = "";
    public get playerName(): string {
        return this._playerName;
    }

    protected _classID: PlayerClasses | null;
    public get classID(): PlayerClasses {
        if(this._classID === null) {
            throw new Error("className is undefined");
        }

        return this._classID;
    }

    public constructor(playerName: string, className: PlayerClasses | null) {
        this._playerName = playerName;
        this._classID = className;
    }
}