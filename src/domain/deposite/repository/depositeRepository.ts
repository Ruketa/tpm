import { injectable } from "tsyringe";
import { DataSourceService } from "../../../infrastructure/typeorm/datasource/datasourceService";
import { Deposite } from "../../../infrastructure/typeorm/entity/deposite";

@injectable()
export class DepositeRepository {
  constructor(private datasourceService: DataSourceService) {}

  //private async getRepository(): Promise<Repository<Balance>> {
  //  const datasource = await this.datasourceService.getDataSouce();
  //  return datasource.getRepository(Deposite);
  //}

  //async getDeposite(): Promise<DepositeCollection> {
  //  const repository = await this.getRepository();
  //}
}
