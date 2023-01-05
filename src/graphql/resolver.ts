import { Controllers } from "../controller/const-controllers";

export const generateResolver = (controllers: Controllers) => {
  return {
    getBalance: () => {
      return controllers.balanceController.getBalance();
    },
    postBalacnce: (amount: number) => {
      return controllers.balanceController.postBalance(amount);
    },
  };
};
