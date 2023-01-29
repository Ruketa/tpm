import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import {
  DepositeUsecase,
  IBalanceRepository,
  IDepositeRepository,
  PocketMoney,
} from "../../src/usecase/deposite";
import { container, injectable } from "tsyringe";
import { DepositeCollection } from "../../src/domain/deposite/model/depositeCollection";
import {
  DepositeRepository,
  PostDepositeModel,
} from "../../src/domain/deposite/repository/depositeRepository";
import { DepositeDomain } from "../../src/domain/deposite/model/depositeDomain";
import { BalanceDomain } from "../../src/domain/balance/model/balance";
import { BalanceCollection } from "../../src/domain/balance/model/balanceCollection";
import { PostBalanceModel } from "../../src/infrastructure/typeorm/repository/balanceRepository";
import { IBalanceTypeOrmRepository } from "../../src/domain/balance/repository/balanceRepository";
import { Balance } from "../../src/infrastructure/typeorm/entity/balance";

describe("deposite usecase suite", () => {
  const store: { deposite: DepositeDomain[]; balance: BalanceDomain[] } = {
    deposite: [],
    balance: [],
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
        balanceDomains.push(
          new BalanceDomain({
            id: i,
            amount: parameter.amount,
            updated_on: parameter.updated_on,
          })
        );
      });
      store.balance = balanceDomains;
      return new BalanceCollection(balanceDomains);
    }
  }

  @injectable()
  class MockRepository implements IDepositeRepository {
    async getDeposite(): Promise<DepositeCollection> {
      const collection = new DepositeCollection(store.deposite);
      return collection;
    }
    async saveDeposite(
      params: PostDepositeModel[]
    ): Promise<DepositeCollection> {
      const depositeDomains: DepositeDomain[] = [];
      params.forEach((parameter, i) => {
        depositeDomains.push(
          new DepositeDomain({
            id: i,
            amount: parameter.amount,
            depositeTypeId: parameter.depositeTypeId,
            from: parameter.from,
            comment: parameter.comment,
            updated_on: parameter.updated_on,
          })
        );
      });
      store.deposite = depositeDomains;
      const collection = new DepositeCollection(depositeDomains);
      return collection;
    }
  }

  @injectable()
  class MockBalanceTypeOrmRepository implements IBalanceTypeOrmRepository {
    async getBalance(): Promise<Balance[]> {
      return;
    }
    async saveBalance(entities: Balance[]): Promise<Balance[]> {
      return;
    }
  }
  @injectable()
  class MockDepositeTypeOrmRepository implements IDepositeRepository {
    async getDeposite(): Promise<DepositeCollection> {
      return;
    }
    async saveDeposite(
      parameter: PostDepositeModel[]
    ): Promise<DepositeCollection> {
      return;
    }
  }

  beforeEach(() => {
    container.register(
      "DepositeTypeOrmRepository",
      MockDepositeTypeOrmRepository
    );
    container.register(
      "BalanceTypeOrmRepository",
      MockBalanceTypeOrmRepository
    );
    container.register("UsecaseDepositeRepository", MockRepository);
    container.register("UsecaseBalanceRepository", MockBalanceRepository);
  });

  afterEach(() => {
    container.clearInstances();
    store.balance = [];
    store.deposite = [];
  });

  test("create instance", () => {
    const repository = container.resolve(DepositeUsecase);
    expect(repository instanceof DepositeUsecase).toBeTruthy();
  });

  test("deposite pocket money success", async () => {
    const usecase = container.resolve(DepositeUsecase);
    const pocketMoney: PocketMoney[] = [
      {
        amount: 10,
        depositeTypeId: 1,
        from: "wife",
        comment: "Good job",
      },
      {
        amount: 20,
        depositeTypeId: 1,
        from: "wife",
        comment: "thank you",
      },
    ];
    const collection = await usecase.depositePocketMoney(pocketMoney);
    const deposits: DepositeDomain[] = [];
    for (const deposite of collection) {
      deposits.push(deposite);
    }
    expect(deposits[0].id.Value).toBe(0);
    expect(deposits[0].amount.Value).toBe(10);
    expect(deposits[0].depositeTypeId.Value).toBe(1);
    expect(deposits[0].from).toBe("wife");
    expect(deposits[0].comment).toBe("Good job");

    expect(deposits[1].id.Value).toBe(1);
    expect(deposits[1].amount.Value).toBe(20);
    expect(deposits[1].depositeTypeId.Value).toBe(1);
    expect(deposits[1].from).toBe("wife");
    expect(deposits[1].comment).toBe("thank you");

    expect(store.balance[0].id).toBe(0);
    expect(store.balance[0].amount.Value).toBe(10);
    expect(store.balance[1].id).toBe(1);
    expect(store.balance[1].amount.Value).toBe(20);
  });
});
