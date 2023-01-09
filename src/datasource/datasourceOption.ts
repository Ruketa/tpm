import "reflect-metadata";
import { DataSourceOptions } from "typeorm";
import { Balance } from "../domain/balance/repository/typeorm/entity/balance";
import { Deposite } from "../domain/deposite/entity/deposite";
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
  entities: [Balance, Deposite, Payment],
  migrations: [],
  subscribers: [],
};
