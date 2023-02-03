import "reflect-metadata";
import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { container, injectable } from "tsyringe";
import {
  IBalanceRepository,
  IPaymentRepository,
} from "../../src/usecase/interface";
import { BalanceCollection } from "../../src/domain/balance/model/balanceCollection";
import { PostBalanceModel } from "../../src/domain/balance/repository/balanceRepository";
import { BalanceDomain } from "../../src/domain/balance/model/balance";
import { PaymentCollection } from "../../src/domain/payment/model/paymentCollection";
import { SavePaymentModel } from "../../src/domain/payment/repository/paymentRepository";
import { PaymentModel, PaymentUsecase } from "../../src/usecase/payment";
import { PaymentDomain } from "../../src/domain/payment/model/paymentDomain";

describe("paiment usecase suite", () => {
  const store: { balance: BalanceDomain[]; payment: PaymentDomain[] } = {
    balance: [],
    payment: [],
  };

  @injectable()
  class MockBalanceRepository implements IBalanceRepository {
    async getBalance(): Promise<BalanceCollection> {
      return new BalanceCollection(store.balance);
    }
    async saveBalance(
      balances: PostBalanceModel[]
    ): Promise<BalanceCollection> {
      const balanceDomains: BalanceDomain[] = [];
      balances.forEach((parameter, i) => {
        const lastBalanceDomain = store.balance[store.balance.length - 1];
        const balanceDomain = new BalanceDomain({
          id: lastBalanceDomain.id + 1,
          amount: parameter.amount,
          updated_on: parameter.updated_on,
        });
        store.balance.push(balanceDomain);
        balanceDomains.push(balanceDomain);
      });
      return new BalanceCollection(balanceDomains);
    }
  }

  @injectable()
  class MockPaymentRepository implements IPaymentRepository {
    async getPayment(): Promise<PaymentCollection> {
      return;
    }
    async savePayment(
      payments: SavePaymentModel[]
    ): Promise<PaymentCollection> {
      const paymentDomains: PaymentDomain[] = [];
      payments.forEach((payment, index) => {
        paymentDomains.push(
          new PaymentDomain({
            id: index,
            amount: payment.amount,
            paied_on: payment.paied_on,
            purchased_item: payment.purchased_item,
            quantity: payment.quantity,
          })
        );
      });
      const collection = new PaymentCollection(paymentDomains);
      return collection;
    }
  }

  beforeEach(() => {
    container.register("UsecasePaymentRepository", MockPaymentRepository);
    container.register("UsecaseBalanceRepository", MockBalanceRepository);
    store.balance.push(
      new BalanceDomain({
        id: 0,
        amount: 1000,
        updated_on: new Date(2023, 2, 2),
      })
    );
  });

  afterEach(() => {
    container.clearInstances();
    store.balance = [];
  });

  test("create instance", () => {
    const usecase = container.resolve(PaymentUsecase);
    expect(usecase instanceof PaymentUsecase);
  });

  test("purchaseItem", async () => {
    const usecase = container.resolve(PaymentUsecase);
    const paymentModels: PaymentModel[] = [
      {
        amount: 123,
        purchase_item: "snacks",
        paied_on: new Date(2023, 2, 1),
        quantity: 1,
      },
    ];

    const collection = await usecase.purchaseItems(paymentModels);

    expect(collection.length).toBe(1);
    expect(collection.at(0).Id.Value).toBe(0);
    expect(collection.at(0).Amount.Value).toBe(123);
    expect(collection.at(0).purchased_item).toBe("snacks");
    expect(collection.at(0).quantity).toBe(1);

    expect(store.balance.length).toBe(2);
    expect(store.balance[1].id).toBe(1);
    expect(store.balance[1].amount.Value).toBe(877);
  });
});
