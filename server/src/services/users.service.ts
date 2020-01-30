import { UsersRepository } from './../repository/users.repository';
import { User } from '../models/user';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les user doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class UsersService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: UsersService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsersService();
        }
        return this.instance;
    }

    // Un singleton est une class ayant une instance unique a travers toute l'app
    private repository: UsersRepository;
    private constructor() {
        this.repository = UsersRepository.getInstance();
    }

    // Business logic

    /**
     * Return a promise which contains an array of users.
     */
    getAll(): Promise<User[]> {
        return this.repository.findAll();
    }

    /**
     * Return a promise which contains the user relative to the id in parameter.
     * @param id user id
     */
    getById(id: number): Promise<User> {
        return this.repository.findById(id);
    }

    /**
     * Create a new user and return a promise which contains the created user.
     * @param user user to create
     */
    create(user: any): Promise<User> {
      return this.repository.insert(user);
    }

    /**
     * Update the user in parameter and return a promise which contains the updated user.
     * @param user user to update
     */
    update(user: any): Promise<User> {
      return this.repository.update(user);
    }

    /**
     * Delete the user related to the id in parameter. Return an empty promise.
     * @param id user id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
