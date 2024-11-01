"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const todoRouter = (0, express_1.Router)();
// In-memory Database
let products = [];
// Get all todos - B
todoRouter.get('/', (req, res) => {
    res.status(200).json(products);
});
// Fetch todo by search id query
todoRouter.get('/search', (req, res) => {
    const { id } = req.query;
    console.log(id);
    const foundTodo = products.find(product => product.id === id);
    if (foundTodo) {
        res.status(200).json(foundTodo);
    }
    else {
        res.status(404).send('Search did not show any results...');
    }
});
// Get todo by id - R
todoRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundTodo = products.find(todo => todo.id === id);
    if (foundTodo) {
        res.status(200).json(foundTodo);
    }
    else {
        res.status(404).send('Todo not found!');
    }
});
// Edit todo by id - E
todoRouter.put('/:id', (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const todoIndex = products.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        const updatedTodo = Object.assign(Object.assign({}, products[todoIndex]), { text: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[todoIndex].product_name, completed: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[todoIndex].product_description, user: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[todoIndex].product_price });
        products[todoIndex] = updatedTodo;
        res.status(201).json(updatedTodo);
    }
    else {
        res.status(404).send('Todo item not found!');
    }
});
// Add todo - A
todoRouter.post('/', (req, res) => {
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price
    };
    products = [...products, newProduct];
    res.status(201).send('Todo added successfully...');
});
// Delete todo by id - D
todoRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const findProduct = products.find(product => product.id === id);
    if (findProduct) {
        products = products.filter(product => product.id !== id);
        res.status(200).send(`Todo was deleted successfully...`);
    }
    else {
        res.status(404).send(`Todo not found!`);
    }
});
exports.default = todoRouter;
