import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { schema } from "./graphql/schema";
import { generateResolver } from "./graphql/resolver";
import { loggingMiddleware } from "./middlewares/loggingmiddleware";
import { BalanceController } from "./controller/balanceController";
import { injectable } from "tsyringe";

@injectable()
export class application {
  private server!: express.Express;

  constructor(private balanceController: BalanceController) {}

  public async initialize(): Promise<void> {
    const controllers = {
      balanceController: this.balanceController,
    };
    const graphqlSchema = buildSchema(schema);

    this.server = express();
    this.server.use(loggingMiddleware);
    this.server.use(
      "/graphql",
      graphqlHTTP({
        schema: graphqlSchema,
        rootValue: generateResolver(controllers),
        graphiql: true,
      })
    );
  }

  run() {
    this.server.listen(4000);
    console.log(
      "Running a GraphQL API server at http://localhost:4000/graphql"
    );
  }
}
