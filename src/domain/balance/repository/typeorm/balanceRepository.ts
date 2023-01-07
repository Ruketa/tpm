import { Repository } from "typeorm";
import { Balance } from "./entity/balance";
import { BalanceCollection } from "../../model/balanceCollection";
import { BalanceDomain } from "../../model/balance";
import { injectable } from "tsyringe";
import { DataSourceService } from "../../../../datasource/datasourceService";
import { BalanceEntityDomainConverter } from "../../service/balanceEntityDomainConverter";

function catchError() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}

export type PostBalanceModel = {
  amount: number;
  updated_on: Date;
};

@injectable()
export class BalanceRepository {
  private converter!: BalanceEntityDomainConverter;

  constructor(private datasourceService: DataSourceService) {
    this.converter = new BalanceEntityDomainConverter();
  }

  private async getRepository(): Promise<Repository<Balance>> {
    const datasource = await this.datasourceService.getDataSouce();
    return datasource.getRepository(Balance);
  }

  async getBalance(): Promise<BalanceCollection> {
    const repository = await this.getRepository();

    return repository
      .find()
      .then((response: Balance[]) => {
        if (response.length === 0) return new BalanceCollection([]);

        const balanceCollection = this.converter.convert(response);
        return balanceCollection;
      })
      .catch((err) => {
        throw new Error("failed to get balances\n" + err);
      });
  }

  async postBalance(
    parameters: PostBalanceModel[]
  ): Promise<BalanceCollection> {
    const repository = await this.getRepository();

    const entities: Balance[] = [];
    parameters.forEach((parameter) => {
      entities.push(new Balance(parameter.amount, parameter.updated_on));
    });

    return repository.save(entities).then((response: Balance[]) => {
      const collection = this.converter.convert(response);
      return collection;
    });
  }
}
