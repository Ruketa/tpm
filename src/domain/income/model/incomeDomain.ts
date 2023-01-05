export type IncomeParameter = {
  id: number;
  amount: number;
  updated_on: Date;
};

export class IncomeDomain {
  private readonly _id!: number;

  private _amount!: number;

  private _updated_on!: Date;

  constructor(incomeParameter: IncomeParameter) {
    if (incomeParameter.amount < 0) {
      throw new Error("amount should be greater than equal zero");
    }

    this._id = incomeParameter.id;
    this._amount = incomeParameter.amount;
    this._updated_on = incomeParameter.updated_on;
  }

  get id(): number {
    return this._id;
  }

  get amount(): number {
    return this._amount;
  }

  get updated_on(): Date {
    return this._updated_on;
  }

  equal(income: IncomeDomain): boolean {
    return this._id === income.id && this._amount == income._amount;
  }
}
