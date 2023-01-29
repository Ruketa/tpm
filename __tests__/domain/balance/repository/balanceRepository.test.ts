import "reflect-metadata";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "@jest/globals";
import { container, injectable } from "tsyringe";
import {
  BalanceRepository,
  IBalanceTypeOrmRepository,
} from "../../../../src/domain/balance/repository/balanceRepository";
import { Balance } from "../../../../src/infrastructure/typeorm/entity/balance";
import { BalanceDomain } from "../../../../src/domain/balance/model/balance";
import { PostBalanceModel } from "../../../../src/infrastructure/typeorm/repository/balanceRepository";

describe("BalanceRepository suite", () => {
  const store: { balance: Balance[] } = { balance: [] };

  @injectable()
  class MockRepository implements IBalanceTypeOrmRepository {
    async getBalance(): Promise<Balance[]> {
      return store.balance;
    }

    async saveBalance(entities: Balance[]): Promise<Balance[]> {
      entities.forEach((e, i) => {
        e.id = i;
      });
      store.balance = entities;
      return entities;
    }
  }

  beforeEach(() => {
    container.register("BalanceTypeOrmRepository", MockRepository);
  });

  afterEach(() => {
    container.clearInstances();
    store.balance = [];
  });

  test("getBalance", async () => {
    store.balance = [
      new Balance(1, new Date(2023, 1, 18)),
      new Balance(2, new Date(2023, 1, 19)),
      new Balance(3, new Date(2023, 1, 20)),
    ];
    store.balance.forEach((balance, i) => {
      balance.id = i;
    });

    const repository = container.resolve(BalanceRepository);
    const balanceCollection = await repository.getBalance();
    expect(balanceCollection.length).toBe(3);

    const balances: BalanceDomain[] = [];
    for (const balance of balanceCollection) {
      balances.push(balance);
    }
    expect(balances[0].amount.Value).toBe(1);
    expect(balances[0].updated_on).toEqual(new Date(2023, 1, 18));

    expect(balances[1].amount.Value).toBe(2);
    expect(balances[1].updated_on).toEqual(new Date(2023, 1, 19));

    expect(balances[2].amount.Value).toBe(3);
    expect(balances[2].updated_on).toEqual(new Date(2023, 1, 20));
  });

  test("getBalance balance is empty", async () => {
    const repository = container.resolve(BalanceRepository);
    const balanceCollection = await repository.getBalance();
    expect(balanceCollection.length).toBe(0);
  });

  test("getBalance balance is invalid", async () => {
    store.balance = undefined;
    const repository = container.resolve(BalanceRepository);
    try {
      await repository.getBalance();
    } catch (e) {
      expect(e.message).toMatch(
        "TypeError: Cannot read property 'length' of undefined"
      );
    }
  });

  test("saveBalance", async () => {
    const params: PostBalanceModel[] = [
      {
        amount: 10,
        updated_on: new Date(2023, 1, 19),
      },
      {
        amount: 20,
        updated_on: new Date(2023, 1, 20),
      },
      {
        amount: 30,
        updated_on: new Date(2023, 1, 21),
      },
    ];

    const repository = container.resolve(BalanceRepository);
    const balanceCollection = await repository.saveBalance(params);

    const balances: BalanceDomain[] = [];
    for (const balance of balanceCollection) {
      balances.push(balance);
    }
    expect(balances[0].amount.Value).toBe(10);
    expect(balances[0].updated_on).toEqual(new Date(2023, 1, 19));

    expect(balances[1].amount.Value).toBe(20);
    expect(balances[1].updated_on).toEqual(new Date(2023, 1, 20));

    expect(balances[2].amount.Value).toBe(30);
    expect(balances[2].updated_on).toEqual(new Date(2023, 1, 21));
  });
});
