import { BalanceDomain } from "./balance";

export class BalanceCollection implements Iterable<BalanceDomain> {

  private collection: Array<BalanceDomain> = []

  constructor(balanceObjects: BalanceDomain[]){
    this.collection = balanceObjects
  }
  [Symbol.iterator](): Iterator<BalanceDomain> {
    return this.collection[Symbol.iterator]()
  }
  
  top(){
    if(this.collection.length === 0) return undefined;
    return this.collection.at(0)
  }
  
}