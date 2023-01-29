import { Repository } from "typeorm";
import { Balance } from "../../../infrastructure/typeorm/entity/balance";
import { injectable } from "tsyringe";
import { DataSourceService } from "../../../infrastructure/typeorm/datasource/datasourceService";
import { IBalanceTypeOrmRepository } from "../../../domain/balance/repository/balanceRepository";

export type PostBalanceModel = {
  amount: number;
  updated_on: Date;
};

@injectable()
export class BalanceTypeormRepository implements IBalanceTypeOrmRepository {
  constructor(private datasourceService: DataSourceService) {}

  private async getRepository(): Promise<Repository<Balance>> {
    const datasource = await this.datasourceService.getDataSouce();
    return datasource.getRepository(Balance);
  }

  async getBalance(): Promise<Balance[]> {
    const repository = await this.getRepository();

    return repository
      .find()
      .then((response: Balance[]) => {
        return response;
      })
      .catch((err) => {
        throw new Error("failed to get balances\n" + err);
      });
  }

  async saveBalance(entities: Balance[]): Promise<Balance[]> {
    const repository = await this.getRepository();

    return repository
      .save(entities)
      .then((response: Balance[]) => {
        return response;
      })
      .catch((err) => {
        throw new Error("faild to save balances\n" + err);
      });
  }
}
