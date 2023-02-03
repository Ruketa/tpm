import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { DataSourceService } from "../datasource/datasourceService";
import { Deposite } from "../entity/deposite";
import { Repository } from "typeorm";

@injectable()
export class DepositeTypeormRepository {
  constructor(
    @inject("DatasourceService")
    private datasourceService: DataSourceService
  ) {}

  private async getRepository(): Promise<Repository<Deposite>> {
    const datasource = await this.datasourceService.getDataSouce();
    return datasource.getRepository(Deposite);
  }

  async getDeposite(): Promise<Deposite[]> {
    const repository = await this.getRepository();

    return repository
      .find()
      .then((response: Deposite[]) => {
        return response;
      })
      .catch((err) => {
        throw new Error("failed to get deposite\n" + err);
      });
  }

  async saveDeposite(entities: Deposite[]): Promise<Deposite[]> {
    const repository = await this.getRepository();

    return repository
      .save(entities)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw new Error("failed to save deposite\n" + err);
      });
  }
}
