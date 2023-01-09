import { describe, expect, test } from "@jest/globals";
import {
  DepositeDomain,
  DepositeParameter,
} from "../../../../src/domain/deposite/model/depositeDomain";
import { Id } from "../../../../src/domain/valueobject/id";
import { Amount } from "../../../../src/domain/valueobject/amount";

describe("constructor", () => {
  test("instance creation", () => {
    const depositeParameter: DepositeParameter = {
      id: 11,
      amount: 567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };

    const deposite = new DepositeDomain(depositeParameter);

    expect(deposite instanceof DepositeDomain).toBeTruthy();
  });

  test("instance creation failed invalid id", () => {
    const depositeParameter: DepositeParameter = {
      id: -11,
      amount: 567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };

    expect(() => new DepositeDomain(depositeParameter)).toThrow(
      "id should be greater than zero"
    );
  });

  test("instance creation failed amount less than zero", () => {
    const depositeParameter: DepositeParameter = {
      id: 11,
      amount: -567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };

    expect(() => new DepositeDomain(depositeParameter)).toThrow(
      "amount should be greater than equal zero"
    );
  });

  test("instance creation failed invalid depositeTypeId", () => {
    const depositeParameter: DepositeParameter = {
      id: 11,
      amount: 567,
      depositeTypeId: -1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };

    expect(() => new DepositeDomain(depositeParameter)).toThrow(
      "id should be greater than zero"
    );
  });

  test("instance creation depositeTypeId nullable", () => {
    const depositeParameter: DepositeParameter = {
      id: 11,
      amount: 567,
      depositeTypeId: null,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };

    const deposite = new DepositeDomain(depositeParameter);

    expect(deposite instanceof DepositeDomain).toBeTruthy();
  });
});

describe("property", () => {
  test("id", () => {
    const depositeParameter: DepositeParameter = {
      id: 11,
      amount: 567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };

    const deposite = new DepositeDomain(depositeParameter);

    expect(deposite.id instanceof Id).toBeTruthy();
    expect(deposite.id.Value).toEqual(11);
  });

  test("depositeTypeId", () => {
    const depositeParameter: DepositeParameter = {
      id: 11,
      amount: 567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };

    const deposite = new DepositeDomain(depositeParameter);

    expect(deposite.depositeTypeId instanceof Id).toBeTruthy();
    expect(deposite.depositeTypeId.Value).toEqual(1);
  });

  test("amount", () => {
    const depositeParameter: DepositeParameter = {
      id: 11,
      amount: 567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };

    const deposite = new DepositeDomain(depositeParameter);

    expect(deposite.amount instanceof Amount).toBeTruthy();
    expect(deposite.amount.Value).toEqual(567);
  });

  test("from", () => {
    const depositeParameter: DepositeParameter = {
      id: 11,
      amount: 567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };

    const deposite = new DepositeDomain(depositeParameter);
    expect(deposite.from).toEqual("Suzuki");
  });

  test("comment", () => {
    const depositeParameter: DepositeParameter = {
      id: 11,
      amount: 567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };

    const deposite = new DepositeDomain(depositeParameter);
    expect(deposite.comment).toEqual("test comment");
  });

  test("updated_on", () => {
    const depositeParameter: DepositeParameter = {
      id: 11,
      amount: 567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };

    const deposite = new DepositeDomain(depositeParameter);

    expect(deposite.updated_on instanceof Date).toBeTruthy();
    expect(deposite.updated_on).toEqual(new Date(2022, 8, 12));
  });
});

describe("equal", () => {
  test("same entity", () => {
    const depositeParameter: DepositeParameter = {
      id: 11,
      amount: 567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };
    const left = new DepositeDomain(depositeParameter);
    const right = new DepositeDomain(depositeParameter);
    expect(left.equal(right)).toBeTruthy();
  });

  test("different id", () => {
    const leftParameter: DepositeParameter = {
      id: 11,
      amount: 567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };
    const left = new DepositeDomain(leftParameter);

    const rightParameter: DepositeParameter = {
      id: 22,
      amount: 567,
      depositeTypeId: 1,
      from: "Suzuki",
      comment: "test comment",
      updated_on: new Date(2022, 8, 12),
    };
    const right = new DepositeDomain(rightParameter);

    expect(left.equal(right)).toBeFalsy();
  });
});
