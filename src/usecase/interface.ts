import { BalanceCollection } from "../domain/balance/model/balanceCollection";
import { DepositeCollection } from "../domain/deposite/model/depositeCollection";
import { PostDepositeModel } from "../domain/deposite/repository/depositeRepository";
import { PostBalanceModel } from "../domain/balance/repository/balanceRepository";
import { PaymentCollection } from "../domain/payment/model/paymentCollection";
import { SavePaymentModel } from "../domain/payment/repository/paymentRepository";

export interface IDepositeRepository {
  getDeposite(): Promise<DepositeCollection>;
  saveDeposite(parameter: PostDepositeModel[]): Promise<DepositeCollection>;
}

export interface IBalanceRepository {
  getBalance(): Promise<BalanceCollection>;
  saveBalance(balances: PostBalanceModel[]): Promise<BalanceCollection>;
}

export interface IPaymentRepository {
  getPayment(): Promise<PaymentCollection>;
  savePayment(payments: SavePaymentModel[]): Promise<PaymentCollection>;
}
