import { DataSource } from "typeorm";
import { injectable } from "tsyringe";
import { DataSourceOption } from "./datasourceOption";

export interface IDataSourceService {
  getDataSouce(): Promise<DataSource>;
}

@injectable()
export class DataSourceService implements IDataSourceService {
  private dataSource: DataSource;

  constructor() {}

  private async initialize(): Promise<void> {
    this.dataSource = new DataSource(DataSourceOption);
    this.dataSource = await this.dataSource.initialize();
  }

  public async getDataSouce(): Promise<DataSource> {
    if (!this.dataSource) {
      await this.initialize();
    }
    return this.dataSource;
  }
}
