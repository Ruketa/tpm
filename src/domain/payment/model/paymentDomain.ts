import { Amount } from "../../valueobject/amount";
import { Id } from "../../valueobject/id";

export interface PaymentParameter {
  id: number;
  amount: number;
  paied_on: Date;
  purchased_item: string;
  quantity: number;
}

export class PaymentDomain {
  private _id: Id;
  private _amount: Amount;
  private readonly _purchased_item: string;
  private readonly _paied_on: Date;
  private readonly _quantity: number;

  constructor(parameter: PaymentParameter) {
    this._id = new Id(parameter.id);
    this._amount = new Amount(parameter.amount);
    this._paied_on = parameter.paied_on;
    this._purchased_item = parameter.purchased_item;
    this._quantity = parameter.quantity;
  }

  get Id(): Id {
    return this._id;
  }

  get Amount(): Amount {
    return this._amount;
  }

  get paied_on(): Date {
    return this._paied_on;
  }

  get purchased_item(): string {
    return this._purchased_item;
  }

  get quantity(): number {
    return this._quantity;
  }

  equal(PaymentDomain: PaymentDomain): boolean {
    return this.Id.equal(PaymentDomain.Id);
  }
}
