import { Request, Response } from 'express';
import { User } from './../models/user';
import { UsersRepository } from '../repository/users.repository';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class AuthService {
    private static instance: AuthService;

    private userRepository: UsersRepository;
    private constructor() {
        this.userRepository = UsersRepository.getInstance();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }

    async signup(user: User): Promise<User> {
        user.password = await argon2.hash(user.password);
        console.log(user.password)
        return this.userRepository.insert(user)

    }

    async signin(email: string, password: string) {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Les informations ne sont pas valide');
        }
        const isValid = await argon2.verify(user.password, password);

        if (!isValid) {
            throw new Error('Les informations ne sont pas valide');
        }
        const userToken = {
            email: user.email,
            id: user.id,
            role: user.role
        };
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('Pas de secret setup');
        }
        
        const token = jwt.sign(userToken, secret);

        return {
            token,
            email: user.email,
            id: user.id,
        }
    };
        


    async verifyToken(req: Request, res: Response, next: Function) {

        const authorization = req.headers.authorization;
        console.log(authorization)
        const bearerToken = authorization?.split(' ')[1];
        if (!bearerToken) {
            res.sendStatus(401);
        }
        else {
            try {
                const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';

                const results: any = await jwt.verify(bearerToken, secret);
                const user = await UsersRepository.getInstance().findByEmail(results.email);
                req.user = {
                    ...user,
                    password: undefined
                };
                next();
            } catch(e) {
                console.log(e);
                res.sendStatus(401);
            }
        }
    };

    /**
     * Return a promise which contains the user relative to the id in parameter.
     * @param id user id
     */
    getById(id: number): Promise<User> {
        return this.userRepository.findById(id);
    }

    getByEmail(email: string): Promise<User> {
        return this.userRepository.findByEmail(email);
    }

    create(user: any): Promise<User> {
        return this.userRepository.insert(user);
    }

    async updateUser(user:any): Promise<User> {
        if (user.password){
            user.password = await argon2.hash(user.password);

        }
        return this.userRepository.update(user);
    }

}