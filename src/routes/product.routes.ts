import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { Product, TodoRequestBody } from "../types/product";

const todoRouter = Router();

// In-memory Database
let products: Product[] = []

// Get all todos - B
todoRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json(products)
})

// Fetch todo by search id query
todoRouter.get('/search', (req: Request<{}, {}, {}, { id: string }>, res: Response) => {
    const { id } = req.query
    console.log(id)
    const foundTodo = products.find(product => product.id === id)
    if (foundTodo) {
        res.status(200).json(foundTodo)
    } else {
        res.status(404).send('Search did not show any results...')
    }
})

// Get todo by id - R
todoRouter.get('/:id', (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const foundTodo = products.find(todo => todo.id === id)
    if (foundTodo) {
        res.status(200).json(foundTodo)
    } else {
        res.status(404).send('Todo not found!')
    }
})

// Edit todo by id - E
todoRouter.put('/:id', (req: Request<{ id: string }, {}, TodoRequestBody>, res: Response) => {
    const { id } = req.params
    const todoIndex = products.findIndex(todo => todo.id === id)
    if (todoIndex !== -1) {
        const updatedTodo = {
            ...products[todoIndex],
            text: req.body.product_name ?? products[todoIndex].product_name,
            completed: req.body.product_description ?? products[todoIndex].product_description,
            user: req.body.product_price ?? products[todoIndex].product_price
        }
        products[todoIndex] = updatedTodo
        res.status(201).json(updatedTodo)
    } else {
        res.status(404).send('Todo item not found!')
    }
})

// Add todo - A
todoRouter.post('/', (req: Request<{}, {}, TodoRequestBody>, res: Response) => {
    const newProduct: Product = {
    id: uuidv4(),
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price
    }
    products = [...products, newProduct]
    res.status(201).send('Todo added successfully...')
})

// Delete todo by id - D
todoRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const findProduct = products.find(product => product.id === id)
    if (findProduct) {
        products = products.filter(product => product.id !== id)
        res.status(200).send(`Todo was deleted successfully...`)
    } else {
        res.status(404).send(`Todo not found!`)
    }
})

export default todoRouter