import "reflect-metadata";
import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { Deposite } from "../../../../src/infrastructure/typeorm/entity/deposite";
import { container, injectable } from "tsyringe";
import {
  DepositeRepository,
  IDepositeTypeOrmRepository,
  PostDepositeModel,
} from "../../../../src/domain/deposite/repository/depositeRepository";
import { DepositeDomain } from "../../../../src/domain/deposite/model/depositeDomain";

describe("DepositeRepository suite", () => {
  const store: { deposites: Deposite[] } = { deposites: [] };

  @injectable()
  class MockRepository implements IDepositeTypeOrmRepository {
    async getDeposite(): Promise<Deposite[]> {
      return store.deposites;
    }
    async saveDeposite(entities: Deposite[]): Promise<Deposite[]> {
      entities.forEach((e, i) => {
        e.id = i;
      });
      store.deposites = entities;
      return entities;
    }
  }

  beforeEach(() => {
    container.register("DepositeTypeOrmRepository", MockRepository);
  });

  afterEach(() => {
    container.clearInstances();
    store.deposites = [];
  });

  test("create instance", () => {
    const repository = container.resolve(DepositeRepository);
    expect(repository instanceof DepositeRepository).toBeTruthy();
  });

  test("get deposits", async () => {
    store.deposites = [
      new Deposite(1, 1, "from1", "comment1", new Date(2023, 1, 21)),
      new Deposite(12, 2, "from2", "comment2", new Date(2023, 1, 22)),
      new Deposite(123, 3, "from3", "comment3", new Date(2023, 1, 23)),
    ];
    store.deposites.forEach((deposite, i) => {
      deposite.id = i;
    });
    const repository = container.resolve(DepositeRepository);
    const collection = await repository.getDeposite();
    expect(collection.length).toBe(3);

    const deposits: DepositeDomain[] = [];
    for (const deposite of collection) {
      deposits.push(deposite);
    }
    expect(deposits[0].amount.Value).toBe(1);
    expect(deposits[0].depositeTypeId.Value).toBe(1);
    expect(deposits[0].from).toBe("from1");
    expect(deposits[0].comment).toBe("comment1");
    expect(deposits[0].updated_on).toEqual(new Date(2023, 1, 21));

    expect(deposits[1].amount.Value).toBe(12);
    expect(deposits[1].depositeTypeId.Value).toBe(2);
    expect(deposits[1].from).toBe("from2");
    expect(deposits[1].comment).toBe("comment2");
    expect(deposits[1].updated_on).toEqual(new Date(2023, 1, 22));

    expect(deposits[2].amount.Value).toBe(123);
    expect(deposits[2].depositeTypeId.Value).toBe(3);
    expect(deposits[2].from).toBe("from3");
    expect(deposits[2].comment).toBe("comment3");
    expect(deposits[2].updated_on).toEqual(new Date(2023, 1, 23));
  });

  test("get empty deposites", async () => {
    const repository = container.resolve(DepositeRepository);
    const collection = await repository.getDeposite();
    expect(collection.length).toBe(0);
  });

  test("save deposites", async () => {
    const repository = container.resolve(DepositeRepository);
    const params: PostDepositeModel[] = [
      {
        amount: 10,
        depositeTypeId: 1,
        from: "from1",
        comment: "comment1",
        updated_on: new Date(2023, 1, 24),
      },
      {
        amount: 20,
        depositeTypeId: 2,
        from: "from2",
        comment: "comment2",
        updated_on: new Date(2023, 1, 25),
      },
      {
        amount: 30,
        depositeTypeId: 3,
        from: "from3",
        comment: "comment3",
        updated_on: new Date(2023, 1, 26),
      },
    ];
    const collection = await repository.saveDeposite(params);
    expect(collection.length).toBe(3);

    const deposits: DepositeDomain[] = [];
    for (const deposite of collection) {
      deposits.push(deposite);
    }
    expect(deposits[0].amount.Value).toBe(10);
    expect(deposits[0].depositeTypeId.Value).toBe(1);
    expect(deposits[0].from).toBe("from1");
    expect(deposits[0].comment).toBe("comment1");
    expect(deposits[0].updated_on).toEqual(new Date(2023, 1, 24));

    expect(deposits[1].amount.Value).toBe(20);
    expect(deposits[1].depositeTypeId.Value).toBe(2);
    expect(deposits[1].from).toBe("from2");
    expect(deposits[1].comment).toBe("comment2");
    expect(deposits[1].updated_on).toEqual(new Date(2023, 1, 25));

    expect(deposits[2].amount.Value).toBe(30);
    expect(deposits[2].depositeTypeId.Value).toBe(3);
    expect(deposits[2].from).toBe("from3");
    expect(deposits[2].comment).toBe("comment3");
    expect(deposits[2].updated_on).toEqual(new Date(2023, 1, 26));
  });
});
