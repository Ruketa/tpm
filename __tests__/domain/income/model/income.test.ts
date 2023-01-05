import { describe, expect, test } from "@jest/globals";
import {
  IncomeDomain,
  IncomeParameter,
} from "../../../../src/domain/income/model/incomeDomain";

describe("constructor", () => {
  test("instance creation", () => {
    const incomeParameter: IncomeParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };

    const income = new IncomeDomain(incomeParameter);

    expect(income instanceof IncomeDomain).toBeTruthy();
  });

  test("instance creation failed amount less than zero", () => {
    const incomeParameter: IncomeParameter = {
      id: 123,
      amount: -567,
      updated_on: new Date(2022, 8, 12),
    };

    expect(() => new IncomeDomain(incomeParameter)).toThrow(
      new Error("amount should be greater than equal zero")
    );
  });
});

describe("property", () => {
  test("id", () => {
    const incomeParameter: IncomeParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };

    const income = new IncomeDomain(incomeParameter);

    expect(income.id).toEqual(123);
  });

  test("amount", () => {
    const incomeParameter: IncomeParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };

    const income = new IncomeDomain(incomeParameter);

    expect(income.amount).toEqual(567);
  });

  test("updated_on", () => {
    const incomeParameter: IncomeParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };

    const income = new IncomeDomain(incomeParameter);

    expect(income.updated_on).toEqual(new Date(2022, 8, 12));
  });
});

describe("equal", () => {
  test("same entity", () => {
    const incomeParameter: IncomeParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };
    const left = new IncomeDomain(incomeParameter);
    const right = new IncomeDomain(incomeParameter);

    expect(left.equal(right)).toBeTruthy();
  });

  test("different id", () => {
    const leftParameter: IncomeParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };
    const left = new IncomeDomain(leftParameter);

    const rightParameter: IncomeParameter = {
      id: 321,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };
    const right = new IncomeDomain(rightParameter);

    expect(left.equal(right)).toBeFalsy();
  });

  test("different amount", () => {
    const leftParameter: IncomeParameter = {
      id: 123,
      amount: 567,
      updated_on: new Date(2022, 8, 12),
    };
    const left = new IncomeDomain(leftParameter);

    const rightParameter: IncomeParameter = {
      id: 123,
      amount: 765,
      updated_on: new Date(2022, 8, 12),
    };
    const right = new IncomeDomain(rightParameter);

    expect(left.equal(right)).toBeFalsy();
  });
});
