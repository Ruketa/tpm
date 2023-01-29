import { DepositeDomain } from "./depositeDomain";

export class DepositeCollection {
  private collection!: DepositeDomain[];

  constructor(deposites: DepositeDomain[]) {
    this.collection = deposites;
  }
  [Symbol.iterator](): Iterator<DepositeDomain> {
    return this.collection[Symbol.iterator]();
  }

  get length(): number {
    return this.collection.length;
  }
}
