import { Router, Request, Response } from "express";

const pageRouter = Router()

// Home
pageRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send('My home page')
})

// About
pageRouter.get('/about', (req: Request, res: Response) => {
    res.status(200).send('About Us')
})

export default pageRouter