import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { PostDepositeModel } from "../domain/deposite/repository/depositeRepository";
import type { DepositeCollection } from "../domain/deposite/model/depositeCollection";
import { PostBalanceModel } from "../infrastructure/typeorm/repository/balanceRepository";
import { IDepositeRepository, IBalanceRepository } from "./interface";
import { Amount } from "../domain/valueobject/amount";

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

  private async updateBalance(
    depositeCollection: DepositeCollection
  ): Promise<void> {
    const updated_on = new Date();
    const balanceCollection = await this.balanceRepository.getBalance();

    let latestBalanceAmount =
      balanceCollection.length === 0
        ? new Amount(0)
        : balanceCollection.top().amount;
    const balancePalameters_: PostBalanceModel[] = [];
    for (const deposite of depositeCollection) {
      latestBalanceAmount = latestBalanceAmount.add(deposite.amount);
      balancePalameters_.push({
        amount: latestBalanceAmount.Value,
        updated_on,
      });
    }
    await this.balanceRepository.saveBalance(balancePalameters_);
  }

  public async depositePocketMoney(
    pocketMoney: PocketMoney[]
  ): Promise<DepositeCollection> {
    const depositeCollection = await this.registerDeposite(pocketMoney);

    await this.updateBalance(depositeCollection);

    return depositeCollection;
  }
}
