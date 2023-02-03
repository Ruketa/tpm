import { injectable, inject } from "tsyringe";
import { Deposite } from "../../../infrastructure/typeorm/entity/deposite";
import { DepositeCollection } from "../model/depositeCollection";
import { DepositeDomain, DepositeParameter } from "../model/depositeDomain";
import { IDepositeRepository } from "../../../usecase/interface";
import { DepositeTypeormRepository } from "../../../infrastructure/typeorm/repository/depositeRepository";

export interface IDepositeTypeOrmRepository {
  getDeposite(): Promise<Deposite[]>;
  saveDeposite(entities: Deposite[]): Promise<Deposite[]>;
}

export type PostDepositeModel = {
  amount: number;
  depositeTypeId: number;
  from: string;
  comment: string;
  updated_on: Date;
};

@injectable()
export class DepositeRepository implements IDepositeRepository {
  constructor(
    @inject("DepositeTypeOrmRepository")
    private depositeRepository: DepositeTypeormRepository
  ) {}

  async getDeposite(): Promise<DepositeCollection> {
    return this.depositeRepository
      .getDeposite()
      .then((response: Deposite[]) => {
        const domains = response.map((x) => new DepositeDomain(x));
        const collection = new DepositeCollection(domains);
        return collection;
      });
  }

  async saveDeposite(
    parameters: PostDepositeModel[]
  ): Promise<DepositeCollection> {
    if (parameters.length === 0) {
      throw Error("deposite parameter list is empty");
    }
    const entities = parameters.map((x) => {
      return new Deposite(
        x.amount,
        x.depositeTypeId,
        x.from,
        x.comment,
        x.updated_on
      );
    });
    const deposites = await this.depositeRepository.saveDeposite(entities);
    return this.convertEntityToDomain(deposites);
  }

  private convertEntityToDomain(deposites: Deposite[]): DepositeCollection {
    const depositeDomains = deposites.map((x) => {
      const parameter: DepositeParameter = {
        id: x.id,
        amount: x.amount,
        depositeTypeId: x.depositeTypeId,
        from: x.from,
        comment: x.comment,
        updated_on: x.updated_on,
      };
      return new DepositeDomain(parameter);
    });
    return new DepositeCollection(depositeDomains);
  }
}
