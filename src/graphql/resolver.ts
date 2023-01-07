import { Controllers } from "../controller/const-controllers";

export const generateResolver = (controllers: Controllers) => {
  return {
    getBalance: () => {
      return controllers.balanceController.getBalance();
    },
    postBalance: (parameter) => {
      return controllers.balanceController.postBalance(parameter.amount);
    },
  };
};
