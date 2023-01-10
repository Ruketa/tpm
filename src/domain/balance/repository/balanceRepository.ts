import { Repository } from "typeorm";
import { Balance } from "../../../infrastructure/typeorm/entity/balance";
import { BalanceCollection } from "../model/balanceCollection";
import { injectable } from "tsyringe";
import { BalanceEntityDomainConverter } from "../service/balanceEntityDomainConverter";
import { BalanceTypeormRepository } from "../../../infrastructure/typeorm/repository/balanceRepository";

export type PostBalanceModel = {
  amount: number;
  updated_on: Date;
};

@injectable()
export class BalanceRepository {
  constructor(
    private balanceRepository: BalanceTypeormRepository,
    private balanceEntityDomainConverter: BalanceEntityDomainConverter
  ) {}

  async getBalance(): Promise<BalanceCollection> {
    return this.balanceRepository
      .getBalance()
      .then((response: Balance[]) => {
        if (response.length === 0) return new BalanceCollection([]);

        const balanceCollection =
          this.balanceEntityDomainConverter.convert(response);
        return balanceCollection;
      })
      .catch((err) => {
        throw new Error("failed to get balances\n" + err);
      });
  }

  async postBalance(
    parameters: PostBalanceModel[]
  ): Promise<BalanceCollection> {
    const entities: Balance[] = [];
    parameters.forEach((parameter) => {
      entities.push(new Balance(parameter.amount, parameter.updated_on));
    });

    return this.balanceRepository
      .saveBalance(entities)
      .then((response: Balance[]) => {
        const collection = this.balanceEntityDomainConverter.convert(response);
        return collection;
      })
      .catch((err) => {
        throw new Error("failed to post balances\n" + err);
      });
  }
}
