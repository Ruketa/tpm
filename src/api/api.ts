import "reflect-metadata";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { schema } from "./graphql/schema";
import { generateResolver } from "./graphql/resolver";
import { loggingMiddleware } from "./middlewares/loggingmiddleware";
import { DataSourceService } from "../infrastructure/typeorm/datasource/datasourceService";
import { container } from "tsyringe";

export class application {
  private server!: express.Express;

  public async initialize(): Promise<void> {
    const datasourceService = container.resolve(DataSourceService);
    await datasourceService.initialize();

    this.server = express();
    this.server.use(loggingMiddleware);
    this.server.use(
      "/graphql",
      graphqlHTTP({
        schema: buildSchema(schema),
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
