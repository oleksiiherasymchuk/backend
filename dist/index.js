"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const carsRouter_1 = require("./router/carsRouter");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.use('/cars', carsRouter_1.carsRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
