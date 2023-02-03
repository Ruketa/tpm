import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import {
  PaymentRepository,
  SavePaymentModel,
} from "../domain/payment/repository/paymentRepository";
import { BalanceRepository } from "../domain/balance/repository/balanceRepository";
import { PaymentCollection } from "../domain/payment/model/paymentCollection";
import { IBalanceRepository } from "./interface";
import { PostBalanceModel } from "../infrastructure/typeorm/repository/balanceRepository";
import { Amount } from "../domain/valueobject/amount";
import { BalanceCollection } from "../domain/balance/model/balanceCollection";

export type PaymentModel = {
  amount: number;
  purchase_item: string;
  paied_on: Date;
  quantity: number;
};

@injectable()
export class PaymentUsecase {
  constructor(
    @inject("UsecasePaymentRepository")
    private paymentRepository: PaymentRepository,
    @inject("UsecaseBalanceRepository")
    private balanceRepository: IBalanceRepository
  ) {}

  async purchaseItems(payments: PaymentModel[]): Promise<PaymentCollection> {
    const paymentModels: SavePaymentModel[] = [];
    payments.forEach((payment) => {
      paymentModels.push({
        amount: payment.amount,
        purchased_item: payment.purchase_item,
        paied_on: payment.paied_on,
        quantity: payment.quantity,
      });
    });
    const paymentCollection = await this.paymentRepository.savePayment(
      paymentModels
    );

    const balanceCollection = await this.balanceRepository.getBalance();
    const amount = this.createAmountAfterPayment(
      balanceCollection,
      paymentCollection
    );
    this.balanceRepository.saveBalance([
      {
        amount: amount.Value,
        updated_on: new Date(),
      },
    ]);
    return paymentCollection;
  }

  private createAmountAfterPayment(
    balanceCollection: BalanceCollection,
    paymentCollection: PaymentCollection
  ): Amount {
    const balance = balanceCollection.top();
    const payment = paymentCollection.top();
    return balance.amount.subtract(payment.Amount);
  }
}
