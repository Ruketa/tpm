import { Amount } from "../../valueobject/amount";
import { Id } from "../../valueobject/id";

export type DepositeParameter = {
  id: number;
  amount: number;
  depositeTypeId: number | null;
  from: string;
  comment: string;
  updated_on: Date;
};

export class DepositeDomain {
  private readonly _id!: Id;

  private _amount!: Amount;

  private _depositeTypeId!: Id | null;

  private _from!: string;

  private _comment!: string;

  private _updated_on!: Date;

  constructor(depositeParameter: DepositeParameter) {
    try {
      this._id = new Id(depositeParameter.id);
      this._amount = new Amount(depositeParameter.amount);
      this._depositeTypeId = depositeParameter.depositeTypeId
        ? new Id(depositeParameter.depositeTypeId)
        : null;
      this._from = depositeParameter.from;
      this._comment = depositeParameter.comment;
      this._updated_on = depositeParameter.updated_on;
    } catch (err) {
      throw Error(err);
    }
  }

  get id(): Id {
    return this._id;
  }

  get depositeTypeId(): Id {
    return this._depositeTypeId;
  }

  get amount(): Amount {
    return this._amount;
  }

  get from(): string {
    return this._from;
  }

  get comment(): string {
    return this._comment;
  }

  get updated_on(): Date {
    return this._updated_on;
  }

  equal(deposite: DepositeDomain): boolean {
    return this._id.equal(deposite.id);
  }
}
