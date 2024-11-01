"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pageRouter = (0, express_1.Router)();
// Home
pageRouter.get('/', (req, res) => {
    res.status(200).send('My home page');
});
// About
pageRouter.get('/about', (req, res) => {
    res.status(200).send('About Us');
});
exports.default = pageRouter;
