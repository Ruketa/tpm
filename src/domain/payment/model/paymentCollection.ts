import { PaymentDomain } from "./paymentDomain";

export class PaymentCollection {
  private collection: PaymentDomain[];
  constructor(payments: PaymentDomain[]) {
    this.collection = payments;
  }

  [Symbol.iterator](): Iterator<PaymentDomain> {
    return this.collection[Symbol.iterator]();
  }

  get length(): number {
    return this.collection.length;
  }

  public at(index: number): PaymentDomain {
    return this.collection[index];
  }

  public top(): PaymentDomain {
    return this.collection[this.collection.length - 1];
  }
}
