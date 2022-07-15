"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const db_1 = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    axios_1.default.get(`https://api.coingecko.com/api/v3/ping
  `).then(response => {
        const data = response.data.gecko_says;
        console.log(data);
        res.send(data);
    }).catch(err => console.log(err));
    db_1.pool.connect(() => {
        console.log("connected");
    });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
