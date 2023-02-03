import { inject, injectable } from "tsyringe";
import { PaymentTypeormRepository } from "../../../infrastructure/typeorm/repository/paymentRepository";
import { Payment } from "../../../infrastructure/typeorm/entity/payment";
import { PaymentCollection } from "../model/paymentCollection";
import { PaymentDomain, PaymentParameter } from "../model/paymentDomain";
import { IPaymentRepository } from "../../../usecase/interface";

export interface IPaymentTypeormRepository {
  getPayment(): Promise<Payment[]>;
  savePayment(entities: Payment[]): Promise<Payment[]>;
}

export type SavePaymentModel = {
  amount: number;
  purchased_item: string;
  paied_on: Date;
  quantity: number;
};

@injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @inject(PaymentTypeormRepository)
    private paymentRepository: IPaymentTypeormRepository
  ) {}

  async getPayment(): Promise<PaymentCollection> {
    return this.paymentRepository.getPayment().then((response: Payment[]) => {
      const domains = response.map((x) => new PaymentDomain(x));
      const collection = new PaymentCollection(domains);
      return collection;
    });
  }

  async savePayment(
    parameters: SavePaymentModel[]
  ): Promise<PaymentCollection> {
    if (parameters.length === 0) {
      throw Error("payment parameter list is empty");
    }
    const entities = parameters.map((x) => {
      return new Payment(x.paied_on, x.amount, x.purchased_item, x.quantity);
    });
    const payments = await this.paymentRepository.savePayment(entities);
    return this.convertEntityToDomain(payments);
  }

  private convertEntityToDomain(payments: Payment[]): PaymentCollection {
    const paymentDomains = payments.map((x) => {
      const parameter: PaymentParameter = {
        id: x.id,
        amount: x.amount,
        purchased_item: x.purchased_item,
        paied_on: x.paied_on,
        quantity: x.quantity,
      };
      return new PaymentDomain(parameter);
    });
    return new PaymentCollection(paymentDomains);
  }
}
