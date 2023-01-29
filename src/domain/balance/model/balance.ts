import { Amount } from "../../valueobject/amount";
import { Id } from "../../valueobject/id";

interface IEntiry<T> {
  equal(entiry: T): boolean;
}

export type BalanceParameter = { id: number; amount: number; updated_on: Date };

export class BalanceDomain implements IEntiry<BalanceDomain> {
  private readonly _id!: Id;

  private _amount!: Amount;

  private _updated_on!: Date;

  constructor(parameter: BalanceParameter) {
    try {
      this._id = new Id(parameter.id);
      this._amount = new Amount(parameter.amount);
      this._updated_on = parameter.updated_on;
    } catch (err) {
      throw Error(err);
    }
  }

  equal(balance: BalanceDomain): boolean {
    return this.id === balance.id && this._amount.equal(balance.amount);
  }

  get amount(): Amount {
    return this._amount;
  }

  get updated_on(): Date {
    return this._updated_on;
  }

  get id(): number {
    return this._id.Value;
  }
}
