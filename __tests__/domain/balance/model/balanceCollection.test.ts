import { describe, expect, test } from "@jest/globals";
import {
  BalanceDomain,
  BalanceParameter,
} from "../../../../src/domain/balance/model/balance";
import { BalanceCollection } from "../../../../src/domain/balance/model/balanceCollection";

const defaultParameters: BalanceParameter[] = [
  {
    id: 1,
    amount: 100,
    updated_on: new Date(2022, 8, 12),
  },
  {
    id: 2,
    amount: 120,
    updated_on: new Date(2022, 8, 12),
  },
  {
    id: 3,
    amount: 123,
    updated_on: new Date(2022, 8, 12),
  },
];

describe("constructor", () => {
  test("instance creation", () => {
    const domains: BalanceDomain[] = defaultParameters.map(
      (p) => new BalanceDomain(p)
    );
    const collectoin = new BalanceCollection(domains);
    expect(collectoin instanceof BalanceCollection).toBeTruthy();
  });
});

describe("top", () => {
  test("get top", () => {
    const domains: BalanceDomain[] = defaultParameters.map(
      (p) => new BalanceDomain(p)
    );
    const collectoin = new BalanceCollection(domains);
    const domain = collectoin.top();
    expect(domain.id).toBe(1);
    expect(domain.amount.Value).toBe(100);
    expect(domain.updated_on).toEqual(new Date(2022, 8, 12));
  });

  test("get top from empty collection", () => {
    const domains: BalanceDomain[] = [];
    const collection = new BalanceCollection(domains);
    expect(collection.top()).toBeUndefined();
  });
});

describe("iterator", () => {
  test("get top", () => {
    const domains: BalanceDomain[] = defaultParameters.map(
      (p) => new BalanceDomain(p)
    );
    const collectoin = new BalanceCollection(domains);

    let index = 0;
    for (const balance of collectoin) {
      expect(balance.equal(domains[index])).toBeTruthy();
      index++;
    }
  });
});
