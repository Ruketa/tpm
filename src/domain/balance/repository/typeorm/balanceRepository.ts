import { Repository } from "typeorm";
import { Balance } from "./entity/balance";
import { BalanceCollection } from "../../model/balanceCollection";
import { BalanceDomain } from "../../model/balance";
import { injectable } from "tsyringe";
import { DataSourceService } from "../../../../datasource/datasourceService";
import { BalanceEntityDomainConverter } from "../../service/balanceEntityDomainConverter";

function catchError() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}

@injectable()
export class BalanceRepository {
  constructor(
    private datasourceService: DataSourceService,
    private balanceEntityDomainConverter: BalanceEntityDomainConverter
  ) {}

  async getBalance(): Promise<BalanceCollection> {
    const datasource = await this.datasourceService.getDataSouce();
    const repository = datasource.getRepository(Balance);

    return repository
      .find()
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
}
