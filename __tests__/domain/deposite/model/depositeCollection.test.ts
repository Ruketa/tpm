import { describe, test, expect, beforeEach, afterEach } from "@jest/globals";
import {
  DepositeDomain,
  DepositeParameter,
} from "../../../../src/domain/deposite/model/depositeDomain";
import { DepositeCollection } from "../../../../src/domain/deposite/model/depositeCollection";

describe("DepositeCollection", () => {
  const depositeParameters: DepositeParameter[] = [
    {
      id: 1,
      amount: 100,
      depositeTypeId: 11,
      from: "Suzuki",
      comment: "test comment1",
      updated_on: new Date(2022, 8, 12),
    },
    {
      id: 2,
      amount: 200,
      depositeTypeId: 22,
      from: "Tanaka",
      comment: "test comment2",
      updated_on: new Date(2022, 8, 13),
    },
    {
      id: 3,
      amount: 300,
      depositeTypeId: 33,
      from: "Kimura",
      comment: "test comment3",
      updated_on: new Date(2022, 8, 14),
    },
  ];
  describe("constructor", () => {
    test("instance creation success", () => {
      const deposites = depositeParameters.map((p) => new DepositeDomain(p));
      const collection = new DepositeCollection(deposites);

      expect(collection instanceof DepositeDomain);
    });

    test("instance creation failed empty deposites", () => {
      const deposites: DepositeDomain[] = [];
      expect(() => new DepositeCollection(deposites)).toThrow(
        "deposites is empty"
      );
    });
  });

  describe("iterator", () => {
    test("get deposite from iterator", () => {
      const domains: DepositeDomain[] = depositeParameters.map(
        (p) => new DepositeDomain(p)
      );
      const collectoin = new DepositeCollection(domains);

      let index = 0;
      for (const deposite of collectoin) {
        expect(deposite.equal(domains[index])).toBeTruthy();
        index++;
      }
    });
  });
});
