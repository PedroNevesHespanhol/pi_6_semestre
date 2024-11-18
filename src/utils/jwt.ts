import { NextFunction, Response } from "express";
import jwt  from "jsonwebtoken";
import { findUserBySlug } from "../services/user";
import { ExtendedRequest } from "../types/extended-request";

export const createJWT = (slug: string) => {
    return jwt.sign({ slug }, process.env.JWT_SECRET as string, {
    expiresIn: '1h', // O token expira em 1 hora (pode ajustar conforme necessário)
    });
}

export const verifyJWT = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    // Verificando se o cookie contém o token
    const token = req.cookies['authToken']; // 'authToken' é o nome do cookie que definimos

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado! Token não encontrado.' });
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        async (error: any, decoded: any) => {
            if(error) return res.status(401).json({ error: 'Acesso negado!' });

            const user = await findUserBySlug(decoded.slug);
            if(!user) return res.status(401).json({ error: 'Acesso negado!' });

            req.userSlug = user.slug;
            next();
        }
    );
}