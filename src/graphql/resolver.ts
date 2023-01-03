import { Controllers } from "../controller/const-controllers";

export const generateResolver = (controllers: Controllers) => {
  return {
      getBalance: ()=>{
        return controllers.balanceController.getBalance()
      },
      setBalacnce: (amount: number) => {
        return controllers.balanceController.setBalance(amount)
      }
    };
}