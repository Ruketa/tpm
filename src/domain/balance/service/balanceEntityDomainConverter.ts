import { BalanceDomain } from "../model/balance";
import { BalanceCollection } from "../model/balanceCollection";
import { Balance } from "../repository/typeorm/entity/balance";

export class BalanceEntityDomainConverter {
  constructor() {}

  convert(entities: Balance[]): BalanceCollection {
    const balances: BalanceDomain[] = [];
    entities.forEach((x) => {
      balances.push(
        new BalanceDomain({
          id: x.id,
          amount: x.amount,
          updated_on: x.updated_on,
        })
      );
    });
    return new BalanceCollection(balances);
  }
}
