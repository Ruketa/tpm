import "reflect-metadata";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { schema } from "./graphql/schema";
import { generateResolver } from "./graphql/resolver";
import { loggingMiddleware } from "./middlewares/loggingmiddleware";

export class application {
  private server!: express.Express;

  public async initialize(): Promise<void> {
    const graphqlSchema = buildSchema(schema);

    this.server = express();
    this.server.use(loggingMiddleware);
    this.server.use(
      "/graphql",
      graphqlHTTP({
        schema: graphqlSchema,
        rootValue: generateResolver(),
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
