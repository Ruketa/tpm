import { describe, test, expect } from "@jest/globals";
import { PaymentParameter } from "../../../../src/domain/payment/model/paymentDomain";
import { PaymentDomain } from "../../../../src/domain/payment/model/paymentDomain";

describe("paymentDomain suite", () => {
  test("create instance", () => {
    const parameter: PaymentParameter = {
      id: 1,
      amount: 10,
      paied_on: new Date(2023, 1, 30),
      purchased_item: "snacks",
      quantity: 1,
    };
    const payment = new PaymentDomain(parameter);
    expect(payment instanceof PaymentDomain).toBeTruthy();
  });

  test("get parameter value", () => {
    const parameter: PaymentParameter = {
      id: 1,
      amount: 10,
      paied_on: new Date(2023, 1, 30),
      purchased_item: "snacks",
      quantity: 2,
    };
    const payment = new PaymentDomain(parameter);
    expect(payment instanceof PaymentDomain).toBeTruthy();

    expect(payment.Id.Value).toBe(1);
    expect(payment.Amount.Value).toBe(10);
    expect(payment.paied_on).toEqual(new Date(2023, 1, 30));
    expect(payment.purchased_item).toBe("snacks");
    expect(payment.quantity).toBe(2);
  });

  test("equal same object", () => {
    const parameter: PaymentParameter = {
      id: 1,
      amount: 10,
      paied_on: new Date(2023, 1, 30),
      purchased_item: "snacks",
      quantity: 2,
    };
    const left = new PaymentDomain(parameter);
    const right = new PaymentDomain(parameter);

    expect(left.equal(right)).toBeTruthy();
  });

  test("equal id is deferent", () => {
    const parameter_left: PaymentParameter = {
      id: 1,
      amount: 10,
      paied_on: new Date(2023, 1, 30),
      purchased_item: "snacks",
      quantity: 1,
    };
    const left = new PaymentDomain(parameter_left);

    const parameter_right: PaymentParameter = {
      id: 2,
      amount: 10,
      paied_on: new Date(2023, 1, 30),
      purchased_item: "snacks",
      quantity: 1,
    };

    const right = new PaymentDomain(parameter_right);

    expect(left.equal(right)).toBeFalsy();
  });
});
