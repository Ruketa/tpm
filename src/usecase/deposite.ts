import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import {
  DepositeRepository,
  PostDepositeModel,
} from "../domain/deposite/repository/depositeRepository";
import type { DepositeCollection } from "../domain/deposite/model/depositeCollection";
import { BalanceRepository } from "../domain/balance/repository/balanceRepository";
import { PostBalanceModel } from "../infrastructure/typeorm/repository/balanceRepository";
import { BalanceCollection } from "../domain/balance/model/balanceCollection";

export interface IDepositeRepository {
  getDeposite(): Promise<DepositeCollection>;
  saveDeposite(parameter: PostDepositeModel[]): Promise<DepositeCollection>;
}

export interface IBalanceRepository {
  getBalance(): Promise<BalanceCollection>;
  saveBalance(balances: PostBalanceModel[]): Promise<BalanceCollection>;
}

export type PocketMoney = {
  amount: number;
  depositeTypeId: number;
  from: string;
  comment: string;
};

@injectable()
export class DepositeUsecase {
  constructor(
    @inject("UsecaseDepositeRepository")
    private depositeRepository: IDepositeRepository,
    @inject("UsecaseBalanceRepository")
    private balanceRepository: IBalanceRepository
  ) {}

  private async registerDeposite(
    pocketMoney: PocketMoney[]
  ): Promise<DepositeCollection> {
    const updated_on = new Date();
    const saveParameters = pocketMoney.map((pm) => {
      return {
        amount: pm.amount,
        depositeTypeId: pm.depositeTypeId,
        from: pm.from,
        comment: pm.comment,
        updated_on: updated_on,
      } as PostDepositeModel;
    });
    const collection = await this.depositeRepository.saveDeposite(
      saveParameters
    );
    return collection;
  }

  public async depositePocketMoney(
    pocketMoney: PocketMoney[]
  ): Promise<DepositeCollection> {
    const updated_on = new Date();
    const balanceParameters = pocketMoney.map((pm) => {
      return {
        amount: pm.amount,
        updated_on: updated_on,
      } as PostBalanceModel;
    });
    this.balanceRepository.saveBalance(balanceParameters);

    return this.registerDeposite(pocketMoney);
  }
}
