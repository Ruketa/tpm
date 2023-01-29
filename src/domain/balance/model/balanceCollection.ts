import { BalanceDomain } from "./balance";

export class BalanceCollection implements Iterable<BalanceDomain> {
  private collection: Array<BalanceDomain> = [];

  constructor(balanceObjects: BalanceDomain[]) {
    this.collection = balanceObjects;
  }
  [Symbol.iterator](): Iterator<BalanceDomain> {
    return this.collection[Symbol.iterator]();
  }

  get length(): number {
    return this.collection.length;
  }

  top() {
    if (this.collection.length === 0) return undefined;
    return this.collection[0];
  }
}
