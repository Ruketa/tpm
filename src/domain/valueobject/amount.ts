
export class Amount {

  private readonly amount!: number;
  get Value() {
    return this.amount
  }

  constructor(amount: number){

    if(amount < 0) throw Error("amount should be greater than equal zero")

    if(!Number.isInteger(amount)) throw Error("amount should be integer value")

    this.amount = amount;
  }

  equal(amount: Amount){
    return this.Value === amount.Value;
  }
}