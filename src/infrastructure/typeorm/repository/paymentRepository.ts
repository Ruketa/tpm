import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { DataSourceService } from "../datasource/datasourceService";
import { Repository } from "typeorm";
import { Payment } from "../entity/payment";
import { IPaymentTypeormRepository } from "../../../domain/payment/repository/paymentRepository";

@injectable()
export class PaymentTypeormRepository implements IPaymentTypeormRepository {
  constructor(
    @inject("DatasourceService") private datasourceService: DataSourceService
  ) {}

  private async getRepository(): Promise<Repository<Payment>> {
    const datasource = await this.datasourceService.getDataSouce();
    return datasource.getRepository(Payment);
  }

  async getPayment(): Promise<Payment[]> {
    const repository = await this.getRepository();

    return repository
      .find()
      .then((response: Payment[]) => {
        return response;
      })
      .catch((err) => {
        throw new Error("failed to get payment\n" + err);
      });
  }

  async savePayment(entities: Payment[]): Promise<Payment[]> {
    const repository = await this.getRepository();

    return repository
      .save(entities)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw new Error("failed to save payment\n" + err);
      });
  }
}
