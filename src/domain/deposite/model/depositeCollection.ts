import { DepositeDomain } from "./depositeDomain";

export class DepositeCollection {
  private collection!: DepositeDomain[];

  constructor(deposites: DepositeDomain[]) {
    if (deposites.length === 0) throw Error("deposites is empty");

    this.collection = deposites;
  }
  [Symbol.iterator](): Iterator<DepositeDomain> {
    return this.collection[Symbol.iterator]();
  }
}
