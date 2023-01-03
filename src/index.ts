import { application } from "./app";
import { container } from "tsyringe";

const main = () => {
  //const app = new application();
  const app = container.resolve(application);
  app
    .initialize()
    .then((_) => {
      app.run();
    })
    .catch((err) => {
      console.log("initialization failed");
      console.log(err);
    });
};

main();
