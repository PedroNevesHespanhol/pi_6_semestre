import { RequestHandler } from "express"
import { signupSchema } from "../schemas/signup";
import { error } from "console";
import { createUser, findUserByEmail, findUserBySlug } from "../services/user";
import slug from "slug";
import { hash } from "bcrypt-ts";

export const signup: RequestHandler = async (req, res) => {
    
    // validar dados
    const safeData = signupSchema.safeParse(req.body);
    if(!safeData.success){
        return res.json({ error: safeData.error.flatten().fieldErrors });
    }

    // verificar email
    const hasEmail = await findUserByEmail(safeData.data.email);
    if(hasEmail) {
        return res.json({ error: 'E-mail já existe!'});
    }

    // criaçao de slugs e verificaçao
    let genSlug = true;
    let userSlug = slug(safeData.data.name);
    while(genSlug) {
        const hasSlug = await findUserBySlug(userSlug);
        if(hasSlug) {
            let slugSuffix = Math.floor(Math.random() * 999999).toString();
            userSlug = slug(safeData.data.name + slugSuffix);
        } else {
            genSlug = false;
        }
    }
    
    // gerar hash de senha
    const hashPassword = await hash(safeData.data.password, 10);

    // cria o user
    const newUser = await createUser({
        slug: userSlug,
        name: safeData.data.name,
        email: safeData.data.email,
        password: hashPassword 
    });

    // cria o token de acesso
    const token = '';


    // retorna o resultado (token, user)
    res.status(201).json({
        token,
        user: {
            name: newUser.name,
            slug: newUser.slug,
            avatar: newUser.avatar
        }
    });
}