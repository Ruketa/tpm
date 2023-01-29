import { container } from "tsyringe";
import { BalanceController } from "../controller/balanceController";

export const generateResolver = () => {
  const balanceController = container.resolve(BalanceController);

  return {
    getBalance: () => {
      return balanceController.getBalance();
    },
    postBalance: (parameter) => {
      return balanceController.postBalance(parameter.amount);
    },
  };
};
