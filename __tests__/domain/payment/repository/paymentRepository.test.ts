import "reflect-metadata";
import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { Payment } from "../../../../src/infrastructure/typeorm/entity/payment";
import { container, injectable } from "tsyringe";
import {
  IPaymentTypeormRepository,
  PaymentRepository,
  SavePaymentModel,
} from "../../../../src/domain/payment/repository/paymentRepository";
import { PaymentTypeormRepository } from "../../../../src/infrastructure/typeorm/repository/paymentRepository";

describe("PaymentRepository suite", () => {
  const store: { payment: Payment[] } = { payment: [] };

  @injectable()
  class MockRepository implements IPaymentTypeormRepository {
    async getPayment(): Promise<Payment[]> {
      return store.payment;
    }
    async savePayment(entities: Payment[]): Promise<Payment[]> {
      entities.forEach((e, i) => {
        e.id = i;
      });
      store.payment = entities;
      return entities;
    }
  }

  beforeEach(() => {
    container.register(PaymentTypeormRepository, MockRepository);
  });

  afterEach(() => {
    container.clearInstances();
    store.payment = [];
  });

  test("create instance", () => {
    const repository = container.resolve(PaymentRepository);
    expect(repository instanceof PaymentRepository).toBeTruthy();
  });

  test("get payment", async () => {
    const repository = container.resolve(PaymentRepository);
    store.payment = [
      new Payment(new Date(2023, 1, 30), 10, "snacks", 1),
      new Payment(new Date(2023, 1, 31), 20, "fruit", 2),
      new Payment(new Date(2023, 2, 1), 30, "vegetable", 3),
    ];
    store.payment.forEach((x, i) => {
      x.id = i;
    });
    const collection = await repository.getPayment();

    expect(collection.at(0).Id.Value).toBe(0);
    expect(collection.at(0).Amount.Value).toBe(10);
    expect(collection.at(0).paied_on).toEqual(new Date(2023, 1, 30));
    expect(collection.at(0).purchased_item).toBe("snacks");
    expect(collection.at(0).quantity).toBe(1);

    expect(collection.at(1).Id.Value).toBe(1);
    expect(collection.at(1).Amount.Value).toBe(20);
    expect(collection.at(1).paied_on).toEqual(new Date(2023, 1, 31));
    expect(collection.at(1).purchased_item).toBe("fruit");
    expect(collection.at(1).quantity).toBe(2);

    expect(collection.at(2).Id.Value).toBe(2);
    expect(collection.at(2).Amount.Value).toBe(30);
    expect(collection.at(2).paied_on).toEqual(new Date(2023, 2, 1));
    expect(collection.at(2).purchased_item).toBe("vegetable");
    expect(collection.at(2).quantity).toBe(3);
  });

  test("save payment", async () => {
    const repository = container.resolve(PaymentRepository);
    const parameters: SavePaymentModel[] = [
      {
        amount: 10,
        purchased_item: "snacks",
        paied_on: new Date(2023, 1, 30),
        quantity: 1,
      },
      {
        amount: 20,
        purchased_item: "fruit",
        paied_on: new Date(2023, 1, 31),
        quantity: 2,
      },
      {
        amount: 30,
        purchased_item: "vegetable",
        paied_on: new Date(2023, 2, 1),
        quantity: 3,
      },
    ];
    const collection = await repository.savePayment(parameters);

    expect(collection.at(0).Id.Value).toBe(0);
    expect(collection.at(0).Amount.Value).toBe(10);
    expect(collection.at(0).paied_on).toEqual(new Date(2023, 1, 30));
    expect(collection.at(0).purchased_item).toBe("snacks");
    expect(collection.at(0).quantity).toBe(1);

    expect(collection.at(1).Id.Value).toBe(1);
    expect(collection.at(1).Amount.Value).toBe(20);
    expect(collection.at(1).paied_on).toEqual(new Date(2023, 1, 31));
    expect(collection.at(1).purchased_item).toBe("fruit");
    expect(collection.at(1).quantity).toBe(2);

    expect(collection.at(2).Id.Value).toBe(2);
    expect(collection.at(2).Amount.Value).toBe(30);
    expect(collection.at(2).paied_on).toEqual(new Date(2023, 2, 1));
    expect(collection.at(2).purchased_item).toBe("vegetable");
    expect(collection.at(2).quantity).toBe(3);
  });
});
