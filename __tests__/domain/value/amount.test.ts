import { describe, expect, test } from "@jest/globals";
import { Amount } from "../../../src/domain/valueobject/amount";

describe("constructor", () => {
  test("instance creation", () => {
    const amount1 = new Amount(1);
    expect(amount1 instanceof Amount).toBeTruthy();

    const amount2 = new Amount(0);
    expect(amount2 instanceof Amount).toBeTruthy();
  });

  test("negative value validation", () => {
    expect(() => new Amount(-1)).toThrow(
      "amount should be greater than equal zero"
    );
  });

  test("integer value validation", () => {
    expect(() => new Amount(1.23)).toThrow("amount should be integer value");
  });

  test("get amount value", () => {
    const amount = new Amount(123);

    expect(amount.Value).toEqual(123);
  });
});

describe("equal", () => {
  test("equal amount values", () => {
    const amount1 = new Amount(12);
    const amount2 = new Amount(12);

    expect(amount1.equal(amount2)).toBeTruthy();
  });

  test("not equal amount values", () => {
    const amount1 = new Amount(12);
    const amount2 = new Amount(21);

    expect(amount1.equal(amount2)).toBeFalsy();
  });
});

describe("calculate amount suite", () => {
  test("add amount", () => {
    const amount1 = new Amount(10);
    const amount2 = new Amount(20);
    const amount3 = amount1.add(amount2);
    expect(amount1.Value).toBe(10);
    expect(amount2.Value).toBe(20);
    expect(amount3.Value).toBe(30);
  });

  test("subtract amount", () => {
    const amount1 = new Amount(20);
    const amount2 = new Amount(12);
    const amount3 = amount1.subtract(amount2);
    expect(amount1.Value).toBe(20);
    expect(amount2.Value).toBe(12);
    expect(amount3.Value).toBe(8);
  });
});
