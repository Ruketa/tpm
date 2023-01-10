import { application } from "./api/api";

const main = () => {
  const app = new application();
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
