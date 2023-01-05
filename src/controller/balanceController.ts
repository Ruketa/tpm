import { BalanceRepository } from "../domain/balance/repository/typeorm/balanceRepository";
import { BalanceCollection } from "../domain/balance/model/balanceCollection";
import { GetBalanceDTO, SetBalanceDTO } from "./dto/balanceDTO";
import { injectable } from "tsyringe";

@injectable()
export class BalanceController {
  constructor(private balanceRepository: BalanceRepository) {}

  public async getBalance(): Promise<GetBalanceDTO[]> {
    return this.balanceRepository
      .getBalance()
      .then((collection: BalanceCollection) => {
        return this.mapBalanceDTO(collection);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  public postBalance(amount: number): Promise<SetBalanceDTO> {
    return;
  }

  private mapBalanceDTO(collection: BalanceCollection): GetBalanceDTO[] {
    const dtos: GetBalanceDTO[] = [];
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
