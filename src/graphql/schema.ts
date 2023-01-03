export const schema = 
  `
    scalar Date

    type Balance {
      balanceId: Int
      amount: Int
      updatedOn: Date
    }

    type Query {
      getBalance: [Balance]
    }

    type Mutation {
      setBalance(amount: Int): Int
    }
  `