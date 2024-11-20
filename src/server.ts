import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import { mainRouter } from "./routers/main";
const server = express();
server.use(helmet());

server.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8081'], // Substitua pelos URLs do seu front-end
    optionsSuccessStatus: 200,
    exposedHeaders: ['Cross-Origin-Opener-Policy', 'Cross-Origin-Resource-Policy']
}));

// Configurar cabeçalhos de resposta
server.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});
server.use('/uploads', express.static('uploads'));
server.use(urlencoded({ extended: true }));
server.use(express.json());
// rotas
server.use(mainRouter);
// servidor rodando
server.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando em ${process.env.BASE_URL}`);
});