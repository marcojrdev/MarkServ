import  dotenv  from 'dotenv';
import cors from 'cors';
import  Express from 'express';
import type {Request, Response} from 'express';
import AuthRoutes from './routes/authRoutes';
import ServicoRoutes from './routes/servicoRoutes';


dotenv.config();


const app = Express();


app.use(Express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use("/api", AuthRoutes);
app.use("/api/servicos", ServicoRoutes);



app.get("/", (req: Request, res: Response) => {
    return res.json({ message: "API is running..." });
});

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "http://localhost";

app.listen(PORT, () => {
    console.log(`Servidor rodando em ${HOST}:${PORT}`);
});
