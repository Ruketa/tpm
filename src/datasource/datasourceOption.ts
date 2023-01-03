import "reflect-metadata";
import { DataSourceOptions } from "typeorm";
import { Balance } from "../domain/balance/repository/typeorm/entity/balance";
import { Income } from "../domain/income/entity/income";
import { Payment } from "../domain/payment/entity/payment";
import { DatabaseConfig } from "../environments/environment";

export const DataSourceOption: DataSourceOptions = {
  type: DatabaseConfig.type,
  host: DatabaseConfig.host,
  port: DatabaseConfig.port,
  username: DatabaseConfig.username,
  password: DatabaseConfig.password,
  database: DatabaseConfig.database,
  synchronize: true,
  logging: false,
  entities: [Balance, Income, Payment],
  migrations: [],
  subscribers: [],
};
