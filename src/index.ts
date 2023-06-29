import express from "express";
import bodyParser from "body-parser";
import { carsRouter } from "./router/carsRouter";

const app = express();
const port = process.env.PORT || 3000;

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)


app.use('/cars', carsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
