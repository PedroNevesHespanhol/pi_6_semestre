import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { mainRouter } from "./routers/main";

const server = express();
server.use(cookieParser());
server.use(helmet());
server.use(cors({
    origin: 'http://localhost:3000', // Origem do frontend
    credentials: true // Permite o envio de cookies
}));
server.use(urlencoded({ extended: true }));
server.use(express.json());

// rotas
server.use(mainRouter);

// servidor rodando
server.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

