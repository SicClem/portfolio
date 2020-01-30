import { User } from './../models/user';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class UsersRepository {

    private static instance: UsersRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'user';

    static getInstance() {
        if (!this.instance) {
            this.instance = new UsersRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all users and return it in a promise.
     */
    findAll(): Promise<User[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((user: any) => new User(user));
          });
    }

    /**
     * Make a query to the database to retrieve one user by its id in parameter. 
     * Return the user found in a promise.
     * @param id user id
     */
    findById(id: number): Promise<User> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new User(results[0]));
    }

    /**
     * Make a query to the database to retrieve one user by its id in parameter. 
     * Return the user found in a promise.
     * @param email user email
     */
    findByEmail(email: string): Promise<User> {
      return this.connection.query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])
        .then((results: any) => new User(results[0]));
  }

    /**
     * Make a query to the database to insert a new user and return the created user in a promise.
     * @param user user to create
     */
    insert(user: User) {
      return this.connection.query(
        `INSERT INTO ${this.table} (name, firstname, email, city, linkedin, github, resume, techskill, language, softskill, role, photo, password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [user.name, user.firstname, user.email, user.password]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing user and return the updated user in a promise.
     * @param user user to update
     */
    update(user: User) {
      return this.connection.query(
        `UPDATE ${this.table} SET name = ?, firstname = ?, email = ?, city = ?, linkedin = ?, github = ?, resume = ?, techskill = ?, language = ?, softskill = ?, role = ?, photo = ?, password = ? WHERE id = ?`,
        [user.name, user.firstname, user.email, user.password, user.id]
      ).then(() => {
        return this.findById(user.id);
      });
    }

    /**
     * Make a query to the database to delete an existing user and return an empry promise
     * @param id user id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
