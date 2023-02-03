import { describe, expect, test } from "@jest/globals";
import {
  PaymentDomain,
  PaymentParameter,
} from "../../../../src/domain/payment/model/paymentDomain";
import { PaymentCollection } from "../../../../src/domain/payment/model/paymentCollection";

describe("PaymentCollection suite", () => {
  test("create instance", () => {
    const domains: PaymentDomain[] = [];
    const parameter: PaymentParameter = {
      id: 1,
      amount: 10,
      paied_on: new Date(2023, 1, 30),
      purchased_item: "snacks",
      quantity: 1,
    };
    domains.push(new PaymentDomain(parameter));
    const collection = new PaymentCollection(domains);
    expect(collection instanceof PaymentCollection).toBeTruthy();
  });

  test("get payment by at", () => {
    const domains: PaymentDomain[] = [
      new PaymentDomain({
        id: 1,
        amount: 10,
        paied_on: new Date(2023, 1, 30),
        purchased_item: "snacks",
        quantity: 1,
      }),
      new PaymentDomain({
        id: 2,
        amount: 20,
        paied_on: new Date(2023, 1, 31),
        purchased_item: "icecream",
        quantity: 2,
      }),
      new PaymentDomain({
        id: 3,
        amount: 30,
        paied_on: new Date(2023, 2, 1),
        purchased_item: "bread",
        quantity: 3,
      }),
    ];
    const collection = new PaymentCollection(domains);

    expect(collection.at(0).Id.equal(domains[0].Id)).toBeTruthy();
    expect(collection.at(0).Amount.equal(domains[0].Amount)).toBeTruthy();
    expect(collection.at(0).paied_on).toEqual(domains[0].paied_on);
    expect(collection.at(0).purchased_item).toBe(domains[0].purchased_item);
    expect(collection.at(0).quantity).toBe(domains[0].quantity);

    expect(collection.at(1).Id.equal(domains[1].Id)).toBeTruthy();
    expect(collection.at(1).Amount.equal(domains[1].Amount)).toBeTruthy();
    expect(collection.at(1).paied_on).toEqual(domains[1].paied_on);
    expect(collection.at(1).purchased_item).toBe(domains[1].purchased_item);
    expect(collection.at(1).quantity).toBe(domains[1].quantity);

    expect(collection.at(2).Id.equal(domains[2].Id)).toBeTruthy();
    expect(collection.at(2).Amount.equal(domains[2].Amount)).toBeTruthy();
    expect(collection.at(2).paied_on).toEqual(domains[2].paied_on);
    expect(collection.at(2).purchased_item).toBe(domains[2].purchased_item);
    expect(collection.at(2).quantity).toBe(domains[2].quantity);
  });

  test("iteration", () => {
    const domains: PaymentDomain[] = [
      new PaymentDomain({
        id: 1,
        amount: 10,
        paied_on: new Date(2023, 1, 30),
        purchased_item: "snacks",
        quantity: 1,
      }),
      new PaymentDomain({
        id: 2,
        amount: 20,
        paied_on: new Date(2023, 1, 31),
        purchased_item: "icecream",
        quantity: 2,
      }),
      new PaymentDomain({
        id: 3,
        amount: 30,
        paied_on: new Date(2023, 2, 1),
        purchased_item: "bread",
        quantity: 3,
      }),
    ];
    const collection = new PaymentCollection(domains);
    const payments: PaymentDomain[] = [];
    for (const payment of collection) {
      payments.push(payment);
    }

    expect(payments.length).toBe(3);

    expect(collection.at(0).Id.equal(domains[0].Id)).toBeTruthy();
    expect(collection.at(0).Amount.equal(domains[0].Amount)).toBeTruthy();
    expect(collection.at(0).paied_on).toEqual(domains[0].paied_on);
    expect(collection.at(0).purchased_item).toBe(domains[0].purchased_item);
    expect(collection.at(0).quantity).toBe(domains[0].quantity);

    expect(collection.at(1).Id.equal(domains[1].Id)).toBeTruthy();
    expect(collection.at(1).Amount.equal(domains[1].Amount)).toBeTruthy();
    expect(collection.at(1).paied_on).toEqual(domains[1].paied_on);
    expect(collection.at(1).purchased_item).toBe(domains[1].purchased_item);
    expect(collection.at(1).quantity).toBe(domains[1].quantity);

    expect(collection.at(2).Id.equal(domains[2].Id)).toBeTruthy();
    expect(collection.at(2).Amount.equal(domains[2].Amount)).toBeTruthy();
    expect(collection.at(2).paied_on).toEqual(domains[2].paied_on);
    expect(collection.at(2).purchased_item).toBe(domains[2].purchased_item);
    expect(collection.at(2).quantity).toBe(domains[2].quantity);
  });

  test("get payment top", () => {
    const domains: PaymentDomain[] = [
      new PaymentDomain({
        id: 1,
        amount: 10,
        paied_on: new Date(2023, 1, 30),
        purchased_item: "snacks",
        quantity: 1,
      }),
      new PaymentDomain({
        id: 2,
        amount: 20,
        paied_on: new Date(2023, 1, 31),
        purchased_item: "icecream",
        quantity: 2,
      }),
      new PaymentDomain({
        id: 3,
        amount: 30,
        paied_on: new Date(2023, 2, 1),
        purchased_item: "bread",
        quantity: 3,
      }),
    ];
    const collection = new PaymentCollection(domains);
    const payment = collection.top();

    expect(payment.Id.equal(domains[2].Id)).toBeTruthy();
    expect(payment.Amount.equal(domains[2].Amount)).toBeTruthy();
    expect(payment.paied_on).toEqual(domains[2].paied_on);
    expect(payment.purchased_item).toBe(domains[2].purchased_item);
    expect(payment.quantity).toBe(domains[2].quantity);
  });
});
