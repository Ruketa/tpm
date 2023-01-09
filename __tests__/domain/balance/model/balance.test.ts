import { describe, expect, test } from "@jest/globals";
import {
  BalanceDomain,
  BalanceParameter,
} from "../../../../src/domain/balance/model/balance";
import { Amount } from "../../../../src/domain/valueobject/amount";

describe("constructor", () => {
  test("instance creation", () => {
    const balanceParameter: BalanceParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };

    const balance = new BalanceDomain(balanceParameter);

    expect(balance instanceof BalanceDomain).toBeTruthy();
  });

  test("instance creation failed", () => {
    const balanceParameter: BalanceParameter = {
      id: 123,
      amount: -567,
      updated_on: new Date(2022, 8, 12),
    };

    expect(() => new BalanceDomain(balanceParameter)).toThrow(
      "amount should be greater than equal zero"
    );
  });
});

describe("property", () => {
  test("amount", () => {
    const balanceParameter: BalanceParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };

    const balance = new BalanceDomain(balanceParameter);
    const amount = new Amount(567);

    expect(amount.equal(balance.amount)).toBeTruthy();
  });

  test("updatedOn", () => {
    const balanceParameter: BalanceParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };

    const balance = new BalanceDomain(balanceParameter);

    expect(balance.updated_on).toEqual(new Date(2022, 8, 12));
  });

  test("id", () => {
    const balanceParameter: BalanceParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };

    const balance = new BalanceDomain(balanceParameter);

    expect(balance.id).toEqual(123);
  });
});

describe("equal", () => {
  test("same entity", () => {
    const balanceParameter: BalanceParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };

    const balance1 = new BalanceDomain(balanceParameter);
    const balance2 = new BalanceDomain(balanceParameter);

    expect(balance1.equal(balance2)).toBeTruthy();
  });

  test("different id", () => {
    const balanceParameter1: BalanceParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };
    const balanceParameter2: BalanceParameter = {
      id: 321,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };

    const balance1 = new BalanceDomain(balanceParameter1);
    const balance2 = new BalanceDomain(balanceParameter2);

    expect(balance1.equal(balance2)).toBeFalsy();
  });
});
