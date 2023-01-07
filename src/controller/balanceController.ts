import {
  BalanceRepository,
  PostBalanceModel,
} from "../domain/balance/repository/typeorm/balanceRepository";
import { BalanceCollection } from "../domain/balance/model/balanceCollection";
import { BalanceDTO } from "./dto/balanceDTO";
import { injectable } from "tsyringe";

@injectable()
export class BalanceController {
  constructor(private balanceRepository: BalanceRepository) {}

  public async getBalance(): Promise<BalanceDTO[]> {
    return this.balanceRepository
      .getBalance()
      .then((collection: BalanceCollection) => {
        return this.mapBalanceDTO(collection);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  public postBalance(amounts: number[]): Promise<BalanceDTO[]> {
    const parameters: PostBalanceModel[] = [];
    const current = new Date();
    amounts.forEach((amount) => {
      parameters.push({
        amount: amount,
        updated_on: current,
      });
    });
    return this.balanceRepository
      .postBalance(parameters)
      .then((response: BalanceCollection) => {
        const dtos: BalanceDTO[] = [];
        return this.mapBalanceDTO(response);
      });
  }

  private mapBalanceDTO(collection: BalanceCollection): BalanceDTO[] {
    const dtos: BalanceDTO[] = [];
    for (const balance of collection) {
      dtos.push({
        balanceId: balance.id,
        amount: balance.amount.Value,
        updatedOn: balance.updated_on,
      });
    }
    return dtos;
  }
}
