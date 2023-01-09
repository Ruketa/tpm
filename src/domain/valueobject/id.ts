import { IValueObject } from "./interface";

export class Id implements IValueObject<Id> {
  private _id!: number;
  constructor(id: number) {
    if (id < 0) throw Error("id should be greater than zero");

    if (!Number.isInteger(id)) throw Error("id should be integer value");

    this._id = id;
  }

  get Value(): number {
    return this._id;
  }

  equal(id: Id): boolean {
    return this._id === id.Value;
  }
}
