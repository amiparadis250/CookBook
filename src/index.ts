import express, { Application, Request, Response } from 'express'
import connectToDatabase from './database/config/database.config';
import ingredientsRouter from './api/routes/ingredients.routes';
import morgan from "morgan"
import cors from "cors"
const app: Application = express()
const port = 5000

// Body parsing Middleware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.get('/', async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Welcome to the MUGIKONI Backend api` })
})

app.use('/api/ingredients', ingredientsRouter);


try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
} catch (error:any) {
    console.log(`Error occurred: ${error.message}`)
}
connectToDatabase();